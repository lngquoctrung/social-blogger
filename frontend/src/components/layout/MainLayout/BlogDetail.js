import React, { useEffect, useState, useCallback, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Heart, Eye, Send } from 'lucide-react';
import api from '../../../api/customAxios';
import Modal from '../../feature/Modal';
import { AppContext } from '../../../context/AppContext';

export default function BlogDetail() {
	const { id } = useParams();
	const [commentText, setCommentText] = useState('');
	const [comments, setComments] = useState([]);
	const [isShowModal, setIsShowModal] = useState(false);
	const auth = useContext(AppContext);
	const [postData, setPostData] = useState({
		author: {
			username: '',
			avatar: '',
		},
		title: '',
		subtitle: '',
		content: '',
		imageurl: '',
		like: 0,
		views: 0,
		createdAt: '',
	});

	// Chuyển các hàm fetch data vào useCallback
	const getPost = useCallback(async () => {
		try {
			const response = await api.get(`/posts/${id}`);
			const data = response.data;
			setPostData(data.data);
		} catch (err) {
			// Xử lý lỗi ở đây
			console.error('Error fetching post:', err);
		}
	}, [id]); // Thêm id vào dependency array

	const getCommentsByPostId = useCallback(async () => {
		try {
			const response = await api.get(`/comments/post/${id}`);
			const data = response.data;
			setComments(data.data);
		} catch (err) {
			// Xử lý lỗi ở đây
			console.error('Error fetching comments:', err);
		}
	}, [id]); // Thêm id vào dependency array

	useEffect(() => {
		getPost();
		getCommentsByPostId();
	}, [id, getPost, getCommentsByPostId]);

	const handleSubmitComment = async (e) => {
		e.preventDefault();
		// Handle comment submission logic here
		if (commentText !== '' && auth.isAuthorized) {
			try {
				await api.post('/comments', {
					postId: id,
					content: commentText,
				});
				setCommentText('');
				getCommentsByPostId();
			} catch (err) {
				console.log(err);
			}
		} else {
			setIsShowModal(true);
		}
	};

	return (
		<div className='min-h-screen bg-gray-50'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
				<div className='bg-white shadow-sm rounded-lg overflow-hidden'>
					{/* Author info section */}
					<div className='p-6 pb-0 flex items-center space-x-3'>
						<img
							src={postData.author.avatar}
							alt='Admin avatar'
							className='w-10 h-10 rounded-full'
						/>
						<div className='flex items-center space-x-2 text-sm text-gray-600'>
							<span className='font-medium'>
								{postData.author.username}
							</span>
							<span>•</span>
							<span>{postData.createdAt.split('T')[0]}</span>
						</div>
					</div>

					{/* Header section */}
					<div className='p-6 space-y-4'>
						<h1 className='text-2xl font-bold tracking-tight'>
							{postData.title}
						</h1>
						<p className='text-gray-600'>{postData.subtitle}</p>
					</div>

					{/* Rest of the component remains the same */}
					<div className='p-6 space-y-6'>
						<div className='aspect-w-16 aspect-h-9 overflow-hidden rounded-lg'>
							<img
								src={postData.imageurl}
								alt='Modern interior design'
								className='w-full h-full object-cover'
							/>
						</div>

						<div className='prose max-w-none'>
							<p className='text-gray-600'>{postData.content}</p>

							<blockquote className='border-l-4 border-gray-300 pl-4 my-4 italic'>
								"Do you have a design in mind for your blog?
								Whether you prefer a trendy look or you're going
								for a more editorial style blog - there's a
								stunning layout for everyone."
							</blockquote>

							<h2 className='text-xl font-semibold mt-6 mb-4'>
								Create Relevant Content
							</h2>

							<p className='text-gray-600'>
								Writing a blog is a great way to position
								yourself as an authority in your field and
								captivate your readers' attention. Consider
								topics that focus on relevant keywords and
								include back links to your website or business.
							</p>
						</div>

						<div className='flex items-center space-x-6 border-t border-b py-3'>
							<div className='flex items-center space-x-2'>
								<Eye
									size={20}
									className='text-gray-500'
								/>
								<span className='text-sm text-gray-600'>
									{postData.views} views
								</span>
							</div>

							<button className='flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors'>
								<Heart size={20} />
								<span className='text-sm'>
									{postData.like} likes
								</span>
							</button>
						</div>

						<div className='space-y-6'>
							<h3 className='text-lg font-semibold'>
								Comments ({comments.length})
							</h3>

							<form
								onSubmit={handleSubmitComment}
								className='flex gap-4'
							>
								<div className='flex-grow'>
									<input
										type='text'
										value={commentText}
										onChange={(e) =>
											setCommentText(e.target.value)
										}
										placeholder='Write a comment...'
										className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors'
									/>
								</div>
								<button
									type='submit'
									className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2'
								>
									<Send size={16} />
									<span>Send</span>
								</button>
							</form>

							<div className='space-y-4'>
								{comments.map((comment) => (
									<div
										key={comment._id}
										className='flex space-x-4'
									>
										<img
											src={comment.userId.avatar}
											alt={comment.userId.username}
											className='w-10 h-10 rounded-full'
										/>
										<div className='flex-grow'>
											<div className='bg-gray-50 p-4 rounded-lg'>
												<div className='flex items-center justify-between mb-2'>
													<h4 className='font-medium text-sm'>
														{
															comment.userId
																.username
														}
													</h4>
													<span className='text-xs text-gray-500'>
														{comment.createdAt}
													</span>
												</div>
												<p className='text-sm text-gray-700'>
													{comment.content}
												</p>
											</div>
											<div className='flex items-center space-x-4 mt-2'>
												<button className='text-sm text-gray-500 hover:text-red-500 transition-colors flex items-center space-x-1'>
													<Heart size={16} />
													<span>{comment.likes}</span>
												</button>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>

			<Modal
				isShow={isShowModal}
				setIsShow={setIsShowModal}
			/>
		</div>
	);
}
