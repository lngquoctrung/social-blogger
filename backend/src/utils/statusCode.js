const successResponses = {
	OK: 200, // Yêu cầu đã thành công, phản hồi chứa dữ liệu
	CREATED: 201, // Yêu cầu đã thành công, một tài nguyên mới đã được tạo
	ACCEPTED: 202, // Yêu cầu đã được chấp nhận nhưng chưa xử lý
	NO_CONTENT: 204, // Yêu cầu đã thành công, nhưng không có nội dung trả về
};

const clientErrors = {
	BAD_REQUEST: 400, // Yêu cầu không hợp lệ, hoặc không hiểu được
	UNAUTHORIZED: 401, // Cần xác thực để truy cập tài nguyên
	FORBIDDEN: 403, // Server từ chối yêu cầu, ngay cả khi đã xác thực
	NOT_FOUND: 404, // Tài nguyên không tồn tại
	METHOD_NOT_ALLOWED: 405, // Phương thức HTTP không được phép cho tài nguyên
	CONFLICT: 409, // Lỗi xung đột
};

const serverErrors = {
	INTERNAL_SERVER_ERROR: 500, // Lỗi không xác định xảy ra trên server
	NOT_IMPLEMENTED: 501, // Server không hỗ trợ phương thức yêu cầu
	BAD_GATEWAY: 502, // Server đã nhận được một phản hồi không hợp lệ từ server khác
	SERVICE_UNAVAILABLE: 504, // Server không sẵn sàng để xử lý yêu cầu
};

module.exports = { successResponses, clientErrors, serverErrors };
