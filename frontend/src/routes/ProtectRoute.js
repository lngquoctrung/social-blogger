import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Navigate } from 'react-router-dom';

export default function ProtectRoute({ children }) {
	const auth = useContext(AppContext);
	return auth.isAuthorized ? (
		children
	) : (
		<Navigate
			to='/login'
			replace
		/>
	);
}
