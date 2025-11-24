const mongoose = require('mongoose');

// * Define validations for User model
const userSchema = new mongoose.Schema({
	username: {
		type: String,
		require: [true, 'Username is required'],
		unique: true,
	},
	email: {
		type: String,
		require: [true, 'Email is required'],
		unique: true,
	},
	password: {
		type: String,
		require: true,
	},
	avatar: {
		type: String,
		default:
			'http://localhost:5050/api/public/images/avatars/default-avatar.jpg',
	},
	role: {
		type: String,
		default: 'user',
	},
	refreshToken: {
		type: String,
		default: '',
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	updatedAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('User', userSchema);
