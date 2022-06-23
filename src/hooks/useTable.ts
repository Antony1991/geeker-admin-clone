import { computed, onMounted, reactive, toRefs } from 'vue';

export interface Pageable {
	pageNum: number;
	pageSize: number;
	total: number;
}
export interface TableStateProps {
	tableData: any[];
	searchShow: boolean;
	pageable: Pageable;
	searchParam: {
		[key: string]: any;
	};
	initSearchParam: {
		[key: string]: any;
	};
	totalParam: {
		[key: string]: any;
	};
	icon?: {
		[key: string]: any;
	};
	loading?: boolean;
}
export const useTable = (onSearch: (values: any) => Promise<any>, initParam: any = {}, isPageable: boolean = true) => {
	const state = reactive<TableStateProps>({
		// 表格数据
		tableData: [],
		searchShow: false, // 是否展开更多搜索框
		// 分页
		pageable: {
			// 当前页
			pageNum: 1,
			pageSize: 10,
			total: 0
		},
		// 查询参数（只包括查询）
		searchParam: {},
		// 初始化查询参数
		initSearchParam: {},
		// 总参数(包含分页和查询参数)
		totalParam: {},
		loading: false
	});

	/**
	 * @description: 分页查询参数上
	 * @return {*}
	 */
	const pageParam = computed({
		get: () => {
			return {
				pageNum: state.pageable.pageNum,
				pageSize: state.pageable.pageSize
			};
		},
		set: (newVal: any) => {
			console.log('分页更新', newVal);
		}
	});

	onMounted(() => {
		reset();
	});

	/**
	 * @description: 获取表格数据
	 * @return {*}
	 */
	const getTableList = async () => {
		try {
			updatedTotalParam();
			state.totalParam = { ...state.totalParam, ...initParam };
			state.loading = true;
			const data = await onSearch(state.totalParam);
			state.loading = false;
			state.tableData = isPageable ? data.datalist : data;
			const { pageNum, pageSize, total } = data;
			isPageable && updatePageable({ pageNum, pageSize, total });
		} catch (error) {
			console.error(error);
			state.loading = false;
		}
	};

	/**
	 * @description: 更新查询参数
	 * @return {*}
	 */
	const updatedTotalParam = () => {
		state.totalParam = {};
		// 处理查询参数，可以给查询参数加自定义前缀操作
		let nowSearchParam: { [key: string]: any } = {};
		for (const key in state.searchParam) {
			// 某些情况下参数为 false/0 也应该携带参数
			if (state.searchParam[key] || state.searchParam[key] === false || state.searchParam[key] === 0) {
				nowSearchParam[key] = state.searchParam[key];
			}
		}
		const pageParams = isPageable ? pageParam.value : {};
		state.totalParam = { ...state.totalParam, ...nowSearchParam, ...pageParams };
	};
	/**
	 * @description: 更新分页信息
	 * @param {Pageable} resPageable
	 * @return {*}
	 */
	const updatePageable = (resPageable: Pageable) => {
		state.pageable = { ...state.pageable, ...resPageable };
	};

	/**
	 * @description: 数据查询
	 * @return {*}
	 */
	const search = () => {
		state.pageable.pageNum = 1;
		getTableList();
	};

	/**
	 * @description: 重置
	 * @return {*}
	 */
	const reset = () => {
		state.pageable.pageNum = 1;
		state.searchParam = {};

		// 重置搜索表单的时，如果有默认搜索参数，则重置默认的搜索参数
		Object.keys(state.initSearchParam).forEach(key => {
			state.searchParam[key] = state.initSearchParam[key];
		});
		getTableList();
	};

	/**
	 * @description: 每页条数改变
	 * @param {number} val 当前条数
	 * @return {*}
	 */
	const handleSizeChange = (val: number) => {
		state.pageable.pageNum = 1;
		state.pageable.pageSize = val;
		getTableList();
	};

	const handleCurrentChange = (val: number) => {
		state.pageable.pageNum = val;
		getTableList();
	};

	return {
		...toRefs(state),
		getTableList,
		search,
		reset,
		handleSizeChange,
		handleCurrentChange
	};
};
