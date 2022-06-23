import { ElLoading } from 'element-plus';

// 全局请求 loading
let loadingInstance: ReturnType<typeof ElLoading.service>;

const startLoading = () => {
	loadingInstance = ElLoading.service({
		fullscreen: true,
		lock: true,
		text: 'Loading',
		background: 'rgba(0, 0, 0, .7)'
	});
};
const endLoading = () => {
	loadingInstance.close();
};
let needLoadingRequestCount = 0;
export function showFullScreenLoading() {
	if (needLoadingRequestCount === 0) {
		startLoading();
	}
	needLoadingRequestCount++;
}
export function tryHideFullScreenLoading() {
	if (needLoadingRequestCount <= 0) {
		return;
	}
	needLoadingRequestCount--;
	if (needLoadingRequestCount === 0) {
		endLoading();
	}
}
