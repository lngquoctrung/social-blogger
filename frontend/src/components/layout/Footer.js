import React from 'react';
import Contact from './FooterLayout/Contact';
import Feedback from './FooterLayout/Feedback';
import Author from './FooterLayout/Author';

import '../../styles/Footer.css';

export default function Footer() {
	return (
		<>
			<div className='footer'>
				<div className='text-center text-3xl py-6 uppercase'>
					Social Blogger
				</div>
				<div className='footer__content'>
					<Contact />
					<Feedback />
					<Author />
				</div>
			</div>
		</>
	);
}
