import axios from 'axios';
import qs from 'qs';

// Tạo axios với cấu hình cơ bản
const api = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	withCredentials: true, // Cho phép gửi cookie trong các request
	// Cấu hình content-type mặc định là x-www-form-urlencoded
	headers: {},
	// Tự động transform data thành x-www-form-urlencoded format
	transformRequest: [
		function (data, headers) {
			// Kiểm tra nếu data là instance của FormData thì không cần stringify
			if (data instanceof FormData) {
				// Khi sử dụng FormData, trình duyệt sẽ tự động thêm header Content-Type là multipart/form-data
				delete headers['Content-Type']; // Để trình duyệt tự thiết lập 'Content-Type'
				return data; // Trả về dữ liệu dạng FormData mà không cần biến đổi
			} else {
				// Mặc định chuyển đổi các object thành x-www-form-urlencoded
				headers['Content-Type'] = 'application/x-www-form-urlencoded';
				return qs.stringify(data);
			}
		},
	],
});

// Thêm interceptor để xử lý làm mới token
api.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				await api.post('/users/refresh');
				return api(originalRequest);
			} catch (err) {
				// Refresh token expired - redirect to login
				window.location.location = '/login';
				return Promise.reject(error);
			}
		}
		return Promise.reject(error);
	}
);

// Add access token to all requests
api.interceptors.request.use(
	(config) => {
		// Đảm bảo cookie hoặc token được gửi cùng yêu cầu
		config.withCredentials = true; // Sử dụng cookie nếu có
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);
export default api;
