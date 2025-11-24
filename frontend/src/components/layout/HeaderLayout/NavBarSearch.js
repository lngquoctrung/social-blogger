import React from 'react';
import { CiSearch } from 'react-icons/ci';

export default function NavBarSearch() {
	return (
		<div className='navbar__search'>
			<i className='search__icon'>
				<CiSearch />
			</i>
			<input
				className='search__field'
				type='text'
				placeholder='SEARCH'
			/>
		</div>
	);
}
