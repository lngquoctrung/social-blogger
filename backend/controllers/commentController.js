const commentModel = require('../models/commentModel');
const postModel = require('../models/postModel');
const ApiResponse = require('../utils/apiResponse');
const StatusCode = require('../utils/statusCode');

const getAllComments = async (req, res) => {
	try {
		const comments = await commentModel
			.find()
			.populate('userId', 'username avatar')
			.populate('postId', 'title')
			.lean();
		return res
			.status(StatusCode.successResponses.OK)
			.json(ApiResponse.success('Success', comments));
	} catch (err) {
		return res
			.status(StatusCode.serverErrors.INTERNAL_SERVER_ERROR)
			.json(ApiResponse.error('Something went wrong'));
	}
};

const getCommentsByPostId = async (req, res) => {
	try {
		const { postId } = req.params;
		const comments = await commentModel
			.find({ postId })
			.populate('userId', 'username avatar')
			.sort({ createdAt: -1 });
		res.status(StatusCode.successResponses.OK).json(
			ApiResponse.success('Success', comments)
		);
	} catch (err) {
		return res
			.status(StatusCode.serverErrors.INTERNAL_SERVER_ERROR)
			.json(ApiResponse.error('Something went wrong'));
	}
};

const createComment = async (req, res) => {
	const { postId, content } = req.body;
	const userId = req.user.id; // Giả sử có middleware auth để lấy user ID
	try {
		// Kiểm tra post có tồn tại không
		const post = await postModel.findById(postId);
		if (!post) {
			return res
				.status(StatusCode.clientErrors.NOT_FOUND)
				.json(ApiResponse.error('Post not found'));
		}

		const newComment = new commentModel({
			postId,
			userId,
			content,
		});

		const savedComment = await newComment.save();
		const populatedComment = await commentModel
			.findById(savedComment._id)
			.populate('userId', 'username avatar');

		return res
			.status(StatusCode.successResponses.CREATED)
			.json(ApiResponse.success('Created', populatedComment));
	} catch (error) {
		return res
			.status(StatusCode.serverErrors.INTERNAL_SERVER_ERROR)
			.json(ApiResponse.error('Something went wrong'));
	}
};

const updateComment = async (req, res) => {
	res.json({});
};

const deleteComment = async (req, res) => {
	res.json({});
};

const addComment = (req, res) => {
	const { postId, content } = req.body;
	const userId = req.user.id;
	res.json({ postId: postId, userId: userId, content: content });
};

module.exports = {
	getAllComments,
	getCommentsByPostId,
	createComment,
	updateComment,
	deleteComment,
};
