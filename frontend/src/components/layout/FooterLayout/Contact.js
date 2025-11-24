import React from 'react';
import { FaFacebook, FaLinkedin, FaGithub, FaDiscord } from 'react-icons/fa';

export default function Contact() {
	return (
		<div className='footer__contact'>
			<FaFacebook />
			<FaLinkedin />
			<FaGithub />
			<FaDiscord />
		</div>
	);
}
