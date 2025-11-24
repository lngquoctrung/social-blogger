const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');

const StatusCode = require('../utils/statusCode');
const ApiResponse = require('../utils/apiResponse');

const cookieConfig = {
	accessToken: {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production', // true trong production
		maxAge: 15 * 60 * 1000, // 15 phút
		path: '/',
		sameSite: 'strict',
	},
	refreshToken: {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày
		path: '/', // Chỉ gửi cho routes auth
		sameSite: 'strict',
	},
};

const getAllUsers = async (req, res) => {
	try {
		const users = await userModel.find().lean();
		return res
			.status(StatusCode.successResponses.OK)
			.json(ApiResponse.success('Data fetched successfully', users));
	} catch (err) {
		return res
			.status(StatusCode.serverErrors.INTERNAL_SERVER_ERROR)
			.json(
				ApiResponse.error(
					'Something went wrong',
					err,
					StatusCode.serverErrors.INTERNAL_SERVER_ERROR
				)
			);
	}
};

const generateTokens = (userId) => {
	const accessToken = jwt.sign(
		{ id: userId },
		process.env.SECRET_KEY_ACCESS_TOKEN,
		{ expiresIn: '15m' }
	);

	const refreshToken = jwt.sign(
		{ id: userId },
		process.env.SECRET_KEY_REFRESH_TOKEN,
		{ expiresIn: '7h' }
	);

	return { accessToken, refreshToken };
};

const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await userModel.findOne({ email });

		if (!user) {
			return res
				.status(StatusCode.clientErrors.NOT_FOUND)
				.json(
					ApiResponse.error(
						'Account does not exist',
						null,
						StatusCode.clientErrors.NOT_FOUND
					)
				);
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res
				.status(StatusCode.clientErrors.NOT_FOUND)
				.json(
					ApiResponse.error(
						'Invalid password',
						null,
						StatusCode.clientErrors.NOT_FOUND
					)
				);
		}

		const { accessToken, refreshToken } = generateTokens(user._id);

		// Cập nhật refreshToken trong DB
		user.refreshToken = refreshToken;
		await user.save();

		// Set cookies
		res.cookie('accessToken', accessToken, cookieConfig.accessToken);
		res.cookie('refreshToken', refreshToken, cookieConfig.refreshToken);

		return res
			.status(StatusCode.successResponses.OK)
			.json(ApiResponse.success('Login successful'));
	} catch (err) {
		console.error('Login error:', err);
		return res
			.status(StatusCode.serverErrors.INTERNAL_SERVER_ERROR)
			.json(ApiResponse.error('Something went wrong', err));
	}
};

const logout = async (req, res) => {
	const id = res.user.id;
	try {
		// Xóa refresh token trong DB
		const user = await userModel.findById(id);
		if (user) {
			user.refreshToken = null;
			await user.save();
		}
		// Xóa cả 2 cookies
		res.clearCookie('accessToken', { path: '/' });
		res.clearCookie('refreshToken', { path: '/' });

		return res
			.status(StatusCode.successResponses.OK)
			.json(ApiResponse.success('Logout successfully'));
	} catch (err) {
		return res
			.status(StatusCode.serverErrors.INTERNAL_SERVER_ERROR)
			.json(ApiResponse.error('Server busy'));
	}
};

const register = async (req, res) => {
	const signUpInfo = req.body;
	// Hash password
	const hashedPassword = await bcrypt.hash(signUpInfo.password, 10);
	signUpInfo.password = hashedPassword;
	// Tạo instance user
	const newUser = userModel(signUpInfo);
	try {
		// Lưu vào database
		await newUser.save();
		// Sử dụng Id để tạo token
		const { accessToken, refreshToken } = generateTokens(newUser._id);
		// Cập nhật refresh token vào database
		await userModel.findByIdAndUpdate(newUser._id, {
			refreshToken: refreshToken,
		});
		// Lưu vào cookie
		res.cookie('accessToken', accessToken, cookieConfig.accessToken);
		res.cookie('refreshToken', refreshToken, cookieConfig.refreshToken);
		// Phản hồi token về cho người dùng
		return res
			.status(StatusCode.successResponses.CREATED)
			.json(
				ApiResponse.success(
					'Registration successful',
					null,
					StatusCode.successResponses.CREATED
				)
			);
	} catch (err) {
		if (err.code === 11000) {
			const duplicateField = Object.keys(err.keyValue)[0];
			if (duplicateField === 'username')
				return res
					.status(StatusCode.clientErrors.UNAUTHORIZED)
					.json(
						ApiResponse.error(
							'Username already exists',
							null,
							StatusCode.clientErrors.UNAUTHORIZED
						)
					);
			if (duplicateField === 'email')
				return res
					.status(StatusCode.clientErrors.UNAUTHORIZED)
					.json(
						ApiResponse.error(
							'Email already exists',
							null,
							StatusCode.clientErrors.UNAUTHORIZED
						)
					);
		} else {
			return res
				.status(StatusCode.serverErrors.INTERNAL_SERVER_ERROR)
				.json(ApiResponse.error('Something went wrong', err));
		}
	}
};

const getUserById = async (req, res) => {
	try {
		const id = res.user.id;
		const user = await userModel.findById(id, 'username email avatar');

		if (!user) {
			return res
				.status(StatusCode.clientErrors.NOT_FOUND)
				.json(
					ApiResponse.error(
						'User not found',
						null,
						StatusCode.clientErrors.NOT_FOUND
					)
				);
		}

		return res
			.status(StatusCode.successResponses.OK)
			.json(ApiResponse.success('Data fetched successfully', user));
	} catch (err) {
		console.error('Get user error:', err);
		return res
			.status(StatusCode.serverErrors.INTERNAL_SERVER_ERROR)
			.json(ApiResponse.error('Failed', err));
	}
};

const refresh = async (req, res) => {
	try {
		const refreshToken = req.cookies.refreshToken;
		if (!refreshToken) {
			return res
				.status(StatusCode.clientErrors.FORBIDDEN)
				.json(
					ApiResponse.error(
						'Refresh token not found',
						null,
						StatusCode.clientErrors.FORBIDDEN
					)
				);
		}

		const decoded = jwt.verify(
			refreshToken,
			process.env.SECRET_KEY_REFRESH_TOKEN
		);
		const user = await userModel.findById(decoded.id);

		if (!user || user.refreshToken !== refreshToken) {
			return res
				.status(StatusCode.clientErrors.FORBIDDEN)
				.json(
					ApiResponse.error(
						'Invalid refresh token',
						null,
						StatusCode.clientErrors.FORBIDDEN
					)
				);
		}

		const { accessToken, refreshToken: newRefreshToken } = generateTokens(
			user._id
		);

		user.refreshToken = newRefreshToken;
		await user.save();

		res.cookie('accessToken', accessToken, cookieConfig.accessToken);
		res.cookie('refreshToken', newRefreshToken, cookieConfig.refreshToken);

		return res.status(StatusCode.successResponses.OK).json(
			ApiResponse.success('Token refreshed successfully', {
				accessToken,
			})
		);
	} catch (err) {
		console.error('Refresh token error:', err);
		return res
			.status(StatusCode.serverErrors.INTERNAL_SERVER_ERROR)
			.json(ApiResponse.error('Token refresh failed', err));
	}
};

module.exports = { getAllUsers, login, logout, register, getUserById, refresh };
