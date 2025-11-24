import React from 'react';
import NavBarSearch from './HeaderLayout/NavBarSearch';
import NavBar from './HeaderLayout/NavBar';
import '../../styles/Header.css';

export default function Header() {
	return (
		<nav className='navbar'>
			<NavBarSearch />
			<NavBar />
		</nav>
	);
}
