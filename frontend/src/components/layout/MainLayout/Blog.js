import React, { useState, useContext } from 'react';
import PostList from '../../ui/PostList';
import CreatePostModal from '../../form/PostUploadForm';
import Modal from '../../feature/Modal';
import { AppContext } from '../../../context/AppContext';
import { FaPlus } from 'react-icons/fa';

export default function Blog() {
	const auth = useContext(AppContext);
	const [isShow, setIsShow] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const handlePopupModal = () => {
		if (auth.isAuthorized) setIsModalOpen(true);
		else setIsShow(true);
	};
	return (
		<div>
			<PostList />
			<button
				onClick={handlePopupModal}
				className='fixed left-[80%] top-[85%] md:left-[85%] md:top-[85%] rounded-full p-4 bg-gray-300 text-gray-600 hover:bg-gray-400 hover:text-black transition-colors'
			>
				<FaPlus />
			</button>

			<Modal
				isShow={isShow}
				setIsShow={setIsShow}
			/>

			<CreatePostModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
			/>
		</div>
	);
}
