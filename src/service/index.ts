/*
 * @Author: antonyli antonyli8899@gmail.com
 * @Date: 2022-06-19 14:30:03
 * @LastEditors: antonyli antonyli8899@gmail.com
 * @LastEditTime: 2022-06-20 21:19:54
 * @FilePath: /geeker-admin-clone/src/service/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ResultEnum } from '@/enums/httpEnum';
import { useGlobalStore } from '@/pinia';
import router from '@/routers';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ElMessage } from 'element-plus';
import { showFullScreenLoading, tryHideFullScreenLoading } from './config/serviceLoading';
import { ResultData } from './interface';

type ConfigType = Pick<AxiosRequestConfig, 'baseURL' | 'timeout' | 'withCredentials'>;
const config: ConfigType = {
	baseURL: import.meta.env.VITE_API_URL as string,
	timeout: ResultEnum.TIMEOUT,
	withCredentials: true
};

class RequestHttp {
	service: AxiosInstance;
	public constructor(config: AxiosRequestConfig) {
		// 实例化axios
		this.service = axios.create(config);

		// 请求拦截器
		this.service.interceptors.request.use(
			(config: AxiosRequestConfig) => {
				const globalStore = useGlobalStore();
				config.headers!.loading && showFullScreenLoading();
				config.headers!['x-access-token'] = globalStore.token;
				return config;
			},
			(error: AxiosError) => {
				return Promise.reject(error);
			}
		);

		// 响应拦截器
		this.service.interceptors.response.use(
			(response: AxiosResponse) => {
				const { data } = response;
				tryHideFullScreenLoading();
				// 登录失败
				if (data.code === ResultEnum.OVERDUE) {
					ElMessage.error(data.msg);
					return Promise.reject(data);
				}
				// 全局拦截错误信息
				if (data.code && data.code !== ResultEnum.SUCCESS) {
					ElMessage.error(data.msg);
					return Promise.reject(data);
				}
				return data;
			},
			async (error: AxiosError) => {
				tryHideFullScreenLoading();
				// const {response} = error
				// 服务器结果没返回，断网等
				if (!window.navigator.onLine) {
					return router.replace({ path: '/500' });
				}
				return Promise.reject(error);
			}
		);
	}

	// 常用方法
	get<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
		return this.service.get(url, { params, ..._object });
	}
	post<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
		return this.service.post(url, params, _object);
	}
	put<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
		return this.service.put(url, params, _object);
	}
	delete<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
		return this.service.get(url, { params, ..._object });
	}
}
export default new RequestHttp(config);
