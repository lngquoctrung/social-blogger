import React from 'react';
import { Outlet } from 'react-router-dom';
import MainLayout from './MainLayout/MainLayout';

export default function Main() {
	return (
		<MainLayout>
			<Outlet />
		</MainLayout>
	);
}
