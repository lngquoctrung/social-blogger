const StatusCode = require('./statusCode');

module.exports = class ApiResponse {
	constructor(success, status, statusCode, message, data) {
		(this.success = success),
			(this.status = status),
			(this.statusCode = statusCode),
			(this.message = message);
		this.timestap = new Date().toISOString();
		if (data) this.data = data;
	}

	static success(
		message = 'Successfully',
		data,
		statusCode = StatusCode.successResponses.OK
	) {
		return new ApiResponse(true, 'success', statusCode, message, data);
	}

	static error(
		message = 'Failed',
		errors,
		statusCode = StatusCode.clientErrors.BAD_REQUEST
	) {
		const errRes = new ApiResponse(false, 'error', statusCode, message);
		if (errors) errRes.errors = errors;
		return errRes;
	}
};
