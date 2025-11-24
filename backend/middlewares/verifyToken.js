const jwt = require('jsonwebtoken');
require('dotenv').config();
const StatusCode = require('../utils/statusCode');
const ApiResponse = require('../utils/apiResponse');

module.exports = verifyToken = (req, res, next) => {
	const token = req.cookies.accessToken;
	if (!token) {
		return res
			.status(StatusCode.clientErrors.UNAUTHORIZED)
			.json(
				ApiResponse.error(
					'Token not provided',
					null,
					StatusCode.clientErrors.UNAUTHORIZED
				)
			);
	}
	try {
		const decoded = jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);
		res.user = decoded;
		req.user = decoded;
		next();
	} catch (err) {
		return res
			.status(StatusCode.clientErrors.FORBIDDEN)
			.json(
				ApiResponse.error(
					'Invalid token',
					null,
					StatusCode.clientErrors.FORBIDDEN
				)
			);
	}
};
