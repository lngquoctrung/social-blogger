import React from 'react';
import RegisterForm from '../components/form/RegisterForm';
import { ToastContainer, toast } from 'react-toastify';
import '../styles/RegisterPage.css';

export default function Register() {
	return (
		<div className='login__page'>
			<h1 className='login-page__header'>Social Blogger</h1>
			<RegisterForm toast={toast} />
			<ToastContainer />
		</div>
	);
}
