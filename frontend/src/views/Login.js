import React from 'react';
import LoginForm from '../components/form/LoginForm';
import { ToastContainer, toast } from 'react-toastify';
import '../styles/LoginPage.css';

export default function Login() {
	return (
		<div className='login__page'>
			<h1 className='login-page__header'>Social Blogger</h1>
			<LoginForm toast={toast} />
			<ToastContainer />
		</div>
	);
}
