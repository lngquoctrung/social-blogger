import React from 'react';

export default function PodCast() {
	const episodes = [
		{
			id: 1,
			title: 'Makers - with guest Jaydan Johns',
			date: '9/29/2023',
			duration: '10 min',
			hasVideo: true,
			image: 'http://localhost:5050/api/public/images/podcasts/default-podcast.jpg',
			description:
				'Do you have video episodes in your podcast? Any podcast episodes will get a video player.',
		},
		{
			id: 2,
			title: 'Makers - with guest Gaia Russo',
			date: '9/15/2023',
			duration: '12 min',
			image: 'http://localhost:5050/api/public/images/podcasts/default-podcast.jpg',
			description:
				'Any changes you make to your podcast, like adding or editing an episode, will automatically be updated on your player.',
		},
		{
			id: 3,
			title: 'Makers - with guest Lucien Bisset',
			date: '9/1/2023',
			duration: '5 min',
			image: 'http://localhost:5050/api/public/images/podcasts/default-podcast.jpg',
			description:
				'Every episode automatically gets its own page. Visitors can watch, listen and download each episode.',
		},
		{
			id: 4,
			title: 'Makers - with guest Abbey Landsman',
			date: '8/18/2023',
			duration: '21 min',
			image: 'http://localhost:5050/api/public/images/podcasts/default-podcast.jpg',
			description:
				'Customize the look and feel of the player to match your site. Your podcast will look and sound awesome!',
		},
	];

	return (
		<div className='min-h-screen bg-gray-50'>
			<div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
				{/* Header */}
				<div className='text-center mb-12'>
					<h1 className='text-2xl font-semibold mb-2'>
						DESIGN FOR LIFE
					</h1>
					<h2 className='text-xl mb-4'>MAKERS PODCAST</h2>
					<p className='text-gray-600 mb-2'>Hosted by QcTrung</p>
					<p className='text-sm text-gray-500 max-w-lg mx-auto'>
						All the info, audio or video that's needed to show and
						play your podcast episodes is contained in the RSS feed.
						Head to Settings and connect your podcast's RSS feed.
					</p>
				</div>

				{/* Search Bar */}
				<div className='mb-8'>
					<div className='relative max-w-md mx-auto'>
						<input
							type='text'
							placeholder='Search podcast...'
							className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
						/>
						<span className='absolute right-3 top-2.5 text-gray-400'>
							🔍
						</span>
					</div>
				</div>

				{/* Episodes List */}
				<div className='space-y-6'>
					{episodes.map((episode) => (
						<div
							key={episode.id}
							className='flex gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow'
						>
							<img
								src={episode.image}
								alt={episode.title}
								className='w-20 h-20 object-cover rounded-md'
							/>
							<div className='flex-1'>
								<h3 className='font-medium text-lg mb-1'>
									{episode.title}
								</h3>
								<div className='flex items-center gap-2 text-sm text-gray-500 mb-2'>
									<span>{episode.date}</span>
									<span>•</span>
									<span>{episode.duration}</span>
									{episode.hasVideo && (
										<>
											<span>•</span>
											<span className='px-2 py-0.5 bg-gray-100 rounded-full text-xs'>
												Latest Episode
											</span>
										</>
									)}
								</div>
								<p className='text-sm text-gray-600'>
									{episode.description}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
