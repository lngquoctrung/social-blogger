import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsList } from 'react-icons/bs';
import { IoMdClose } from 'react-icons/io';

export default function NavBar() {
	const [isVisible, setIsVisible] = useState(false);
	const [isAnimating, setIsAnimating] = useState(false);

	const showNav = () => {
		setIsVisible(!isVisible);
		setIsAnimating(true);
	};

	const redirect = () => {
		setIsAnimating(true);
		setIsVisible(false);
	};

	const handleTransitionEnd = () => {
		setIsAnimating(false);
	};
	return (
		<>
			<button
				className='navbar__btn'
				onClick={showNav}
			>
				{!isVisible ? <BsList /> : <IoMdClose />}
			</button>
			<ul
				className={`navbar__nav ${
					isVisible ? 'navbar__nav--visible' : ''
				} ${isAnimating ? 'navbar__nav--animating' : ''}`}
				onTransitionEnd={handleTransitionEnd}
			>
				<li>
					<Link
						to='/'
						onClick={redirect}
					>
						Home
					</Link>
				</li>
				<li>
					<Link
						to='/blog'
						onClick={redirect}
					>
						Blog
					</Link>
				</li>
				<li>
					<Link
						to='/podcast'
						onClick={redirect}
					>
						Podcast
					</Link>
				</li>
				<li>
					<Link
						to='/about'
						onClick={redirect}
					>
						About
					</Link>
				</li>
			</ul>
		</>
	);
}
