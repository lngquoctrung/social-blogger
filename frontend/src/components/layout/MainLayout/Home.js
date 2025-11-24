import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Banner from '../../feature/Banner';
import Modal from '../../feature/Modal';
import PostList from '../../ui/PostList';

export default function Home() {
	const [isShow, setIsShow] = useState(false);
	const navigate = useNavigate();
	const handleViewAllPost = () => {
		navigate('/blog');
	};
	return (
		<>
			<Banner />
			<PostList number={3} />
			<Modal
				isShow={isShow}
				setIsShow={setIsShow}
			/>
			{/* <button onClick={() => setIsShow(!isShow)}>Show</button> */}
			<div className='w-full mb-10 flex justify-center'>
				<button
					className='py-2 px-20 bg-black w-fit text-white hover:bg-gray-300 hover:text-gray-600 md:px-36 md:py-4'
					onClick={handleViewAllPost}
				>
					View all post
				</button>
			</div>
		</>
	);
}
