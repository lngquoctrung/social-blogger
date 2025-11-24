import React from 'react';
// import bannerImage from '../../asset/images/banner.png';

export default function Banner() {
	return (
		<div className='max-w-full'>
			<img
				//https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/fcc528108417997.5fbd47b3b1cd1.png
				className='w-full h-full object-cover'
				src='https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/fcc528108417997.5fbd47b3b1cd1.png'
				alt='Banner'
			/>
		</div>
	);
}
