import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import PostCard from './PostCard';
import '../../styles/PostList.css';
import { AppContext } from '../../context/AppContext';

export default function PostList({ number }) {
	const appContext = useContext(AppContext);
	const navigate = useNavigate();
	const handleRedirectToDetail = (post) => {
		navigate(`/post/${post._id}`);
	};
	return (
		<div className='post-list'>
			{number
				? appContext.posts
						.toReversed()
						.slice(0, number)
						.map((post) => {
							return (
								<PostCard
									key={post._id}
									post={post}
									clickEvent={() =>
										handleRedirectToDetail(post)
									}
								/>
							);
						})
				: appContext.posts.toReversed().map((post) => {
						return (
							<PostCard
								key={post._id}
								post={post}
								clickEvent={() => handleRedirectToDetail(post)}
							/>
						);
				  })}
		</div>
	);
}
