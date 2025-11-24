const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
	postId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Post',
		require: true,
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		require: true,
	},
	content: {
		type: String,
		require: true,
	},
	like: {
		type: Number,
		default: 0,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('Comment', commentSchema);
