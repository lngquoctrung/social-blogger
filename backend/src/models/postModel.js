const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
	title: {
		type: String,
		require: true,
		minLength: 1,
	},
	subtitle: {
		type: String,
		minLength: 1,
	},
	catgory: {
		type: String,
		require: true,
	},
	content: {
		type: String,
		require: true,
		minLength: 1,
	},
	imageurl: {
		type: String,
		default:
			'http://localhost:5050/api/public/images/posts/default-image.jpg',
	},
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	like: {
		type: Number,
		default: 0,
	},
	views: {
		type: Number,
		default: 0,
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

module.exports = mongoose.model('Post', postSchema);
