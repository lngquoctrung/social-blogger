import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { X } from 'lucide-react';
import api from '../../api/customAxios';

const CreatePostModal = ({ isOpen, onClose }) => {
	const [formData, setFormData] = useState({
		title: '',
		subtitle: '',
		content: '',
		category: '',
		image: null,
	});

	const [errors, setErrors] = useState({});
	const [imagePreview, setImagePreview] = useState(null);
	const auth = useContext(AppContext);

	const categories = [
		{ id: 'Technology', name: 'Technology' },
		{ id: 'Lifestyle', name: 'Lifestyle' },
		{ id: 'Travel', name: 'Travel' },
		{ id: 'Food', name: 'Food' },
	];

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
		if (errors[name]) {
			setErrors((prev) => ({
				...prev,
				[name]: '',
			}));
		}
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			if (file.type.startsWith('image/')) {
				setFormData((prev) => ({
					...prev,
					image: file,
				}));
				const reader = new FileReader();
				reader.onloadend = () => {
					setImagePreview(reader.result);
				};
				reader.readAsDataURL(file);
			} else {
				setErrors((prev) => ({
					...prev,
					image: 'Please upload an image file',
				}));
			}
		}
	};

	const validateForm = () => {
		const newErrors = {};
		if (!formData.title.trim()) {
			newErrors.title = 'Title is required';
		}
		if (!formData.subtitle.trim()) {
			newErrors.subtitle = 'Subtitle is required';
		}
		if (!formData.content.trim()) {
			newErrors.content = 'Content is required';
		}
		if (!formData.category) {
			newErrors.category = 'Please select a category';
		}
		return newErrors;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const validationErrors = validateForm();
		if (Object.keys(validationErrors).length === 0) {
			const submitFormData = new FormData();
			submitFormData.append('title', formData.title);
			submitFormData.append('subtitle', formData.subtitle);
			submitFormData.append('content', formData.content);
			submitFormData.append('category', formData.category);
			submitFormData.append('file-upload', formData.image);
			try {
				const response = await api.post(
					'/posts/create',
					submitFormData
				);
				if (response.data.success) {
					auth.getPosts();
					onClose();
				}
			} catch (err) {}
		} else {
			setErrors(validationErrors);
		}
	};

	useEffect(() => {
		return () => {
			if (imagePreview) {
				URL.revokeObjectURL(imagePreview);
			}
		};
	}, [imagePreview]);

	// Xử lý việc ẩn hoặc hiện modal dựa trên isOpen
	if (!isOpen) return null;

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50'>
			<div
				className={`bg-white rounded-lg w-[90%] max-w-2xl mx-auto transition-all duration-300 ease-in-out 
        ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
			>
				{/* Modal Header */}
				<div className='flex justify-between items-center p-4 border-b sticky top-0 bg-white z-10'>
					<h2 className='text-xl font-semibold'>Create New Post</h2>
					<button
						onClick={onClose}
						className='p-1 hover:bg-gray-100 rounded-full transition-colors'
					>
						<X size={20} />
					</button>
				</div>

				{/* Modal Body */}
				<div className='max-h-[calc(90vh-8rem)] overflow-y-auto p-4'>
					<form onSubmit={handleSubmit}>
						{/* Title */}
						<div className='mb-4'>
							<label className='block text-sm font-medium mb-1'>
								Title
							</label>
							<input
								type='text'
								name='title'
								value={formData.title}
								onChange={handleChange}
								className={`w-full p-2 border rounded-md ${
									errors.title
										? 'border-red-500'
										: 'border-gray-300'
								}`}
								placeholder='Enter post title'
							/>
							{errors.title && (
								<p className='text-red-500 text-sm mt-1'>
									{errors.title}
								</p>
							)}
						</div>

						{/* Subtitle */}
						<div className='mb-4'>
							<label className='block text-sm font-medium mb-1'>
								Subtitle
							</label>
							<input
								type='text'
								name='subtitle'
								value={formData.subtitle}
								onChange={handleChange}
								className={`w-full p-2 border rounded-md ${
									errors.subtitle
										? 'border-red-500'
										: 'border-gray-300'
								}`}
								placeholder='Enter post subtitle'
							/>
							{errors.subtitle && (
								<p className='text-red-500 text-sm mt-1'>
									{errors.subtitle}
								</p>
							)}
						</div>

						{/* Category */}
						<div className='mb-4'>
							<label className='block text-sm font-medium mb-1'>
								Category
							</label>
							<select
								name='category'
								value={formData.category}
								onChange={handleChange}
								className={`w-full p-2 border rounded-md ${
									errors.category
										? 'border-red-500'
										: 'border-gray-300'
								}`}
							>
								<option value=''>Select category</option>
								{categories.map((category) => (
									<option
										key={category.id}
										value={category.id}
									>
										{category.name}
									</option>
								))}
							</select>
							{errors.category && (
								<p className='text-red-500 text-sm mt-1'>
									{errors.category}
								</p>
							)}
						</div>

						{/* Content */}
						<div className='mb-4'>
							<label className='block text-sm font-medium mb-1'>
								Content
							</label>
							<textarea
								name='content'
								value={formData.content}
								onChange={handleChange}
								className={`w-full p-2 border rounded-md h-32 resize-none ${
									errors.content
										? 'border-red-500'
										: 'border-gray-300'
								}`}
								placeholder='Enter post content'
							/>
							{errors.content && (
								<p className='text-red-500 text-sm mt-1'>
									{errors.content}
								</p>
							)}
						</div>

						{/* Image Upload */}
						<div className='mb-4'>
							<label className='block text-sm font-medium mb-1'>
								Featured Image
							</label>
							<div className='mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md'>
								<div className='space-y-1 text-center'>
									{imagePreview ? (
										<div className='relative'>
											<img
												src={imagePreview}
												alt='Preview'
												className='mx-auto h-32 w-auto rounded'
											/>
											<button
												type='button'
												onClick={() => {
													setImagePreview(null);
													setFormData((prev) => ({
														...prev,
														image: null,
													}));
												}}
												className='absolute top-0 right-0 bg-red-500 text-white rounded-full p-1'
											>
												<X size={16} />
											</button>
										</div>
									) : (
										<>
											<svg
												className='mx-auto h-12 w-12 text-gray-400'
												stroke='currentColor'
												fill='none'
												viewBox='0 0 48 48'
											>
												<path
													d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
													strokeWidth='2'
													strokeLinecap='round'
													strokeLinejoin='round'
												/>
											</svg>
											<div className='flex text-sm text-gray-600'>
												<label
													htmlFor='file-upload'
													className='relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none'
												>
													<span>Upload a file</span>
													<input
														id='file-upload'
														name='file-upload'
														type='file'
														className='sr-only'
														accept='image/*'
														onChange={
															handleImageChange
														}
													/>
												</label>
												<p className='pl-1'>
													or drag and drop
												</p>
											</div>
											<p className='text-xs text-gray-500'>
												PNG, JPG, GIF up to 10MB
											</p>
										</>
									)}
								</div>
							</div>
							{errors.image && (
								<p className='text-red-500 text-sm mt-1'>
									{errors.image}
								</p>
							)}
						</div>

						{/* Submit Button */}
						<div className='flex justify-end gap-2 mt-6'>
							<button
								type='button'
								onClick={onClose}
								className='px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors'
							>
								Cancel
							</button>
							<button
								type='submit'
								className='px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors'
							>
								Create Post
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default CreatePostModal;
