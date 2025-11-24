const postModel = require('../models/postModel');
const ApiResponse = require('../utils/apiResponse');
const StatusCode = require('../utils/statusCode');

const getAllPosts = async (req, res) => {
	try {
		const posts = await postModel
			.find()
			.populate('author', '_id username email avatar')
			.lean();
		return res
			.status(StatusCode.successResponses.OK)
			.json(ApiResponse.success('Data fetched successfully', posts));
	} catch (err) {
		return res
			.status(StatusCode.serverErrors.INTERNAL_SERVER_ERROR)
			.json(ApiResponse.error('Something went wrong'));
	}
};

const getPostById = async (req, res) => {
	const id = req.params.id;
	try {
		const post = await postModel
			.findById(id)
			.populate('author', 'username avatar -_id');
		res.status(StatusCode.successResponses.OK).json(
			ApiResponse.success('Success', post)
		);
	} catch (err) {
		res.status(StatusCode.successResponses.OK).json(
			ApiResponse.error('Something went wrong')
		);
	}
};

const createPost = async (req, res) => {
	const postInfo = req.body;
	const authorId = req.user.id;
	postInfo.author = authorId;
	if (res.imageUrl)
		postInfo.imageurl = `${process.env.SERVER_URL}/${res.imageUrl}`;
	const newPost = new postModel(postInfo);
	try {
		await newPost.save();
		return res
			.status(StatusCode.successResponses.CREATED)
			.json(ApiResponse.success('Created'));
	} catch (err) {
		return res
			.status(StatusCode.serverErrors.INTERNAL_SERVER_ERROR)
			.json(ApiResponse.error('Something went wrong'));
	}
};

module.exports = { getAllPosts, getPostById, createPost };
