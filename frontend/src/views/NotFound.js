import React from 'react';

export default function NotFound() {
	return (
		<div className='h-screen text-center flex-col content-center'>
			<h1 className='text-6xl mb-4 font-bold'>Ops!</h1>
			<h3 className='text-4xl'>
				Sorry, an unexpected error has occurred.
			</h3>
		</div>
	);
}
