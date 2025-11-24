import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/customAxios';
import { AppContext } from '../../context/AppContext';
import '../../styles/RegisterForm.css';
import 'react-toastify/dist/ReactToastify.css';

export default function RegisterForm({ toast }) {
	const auth = useContext(AppContext);
	const [values, setValues] = useState({
		username: '',
		email: '',
		password: '',
		confirm_password: '',
	});

	const [errors, setErrors] = useState({
		username: {
			isErr: false,
			errMsg: '',
		},
		email: {
			isErr: false,
			errMsg: '',
		},
		password: {
			isErr: false,
			errMsg: '',
		},
		confirm_password: {
			isErr: false,
			errMsg: '',
		},
	});

	const handleChangeValue = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
		setErrors({ ...errors, [e.target.name]: { isErr: false } });
	};

	const navigate = useNavigate();

	const handleRegisterAction = async () => {
		const id = toast.loading('Loading...');

		await new Promise((resolve) => setTimeout(resolve, 1000));
		try {
			const response = await api.post('/users/register', {
				username: values.username,
				email: values.email,
				password: values.password,
			});
			const resData = response.data;
			if (resData.success) {
				// Register success
				toast.update(id, {
					render: 'Register Successful!',
					type: 'success',
					isLoading: false,
					autoClose: 2000,
					closeOnClick: true,
					onClose: () => handleToastClose(),
				});
			}
		} catch (err) {
			if (err.status === 401) {
				const errRes = err.response;
				toast.update(id, {
					render: `Error: ${errRes.data.message}`,
					type: 'error',
					isLoading: false,
					autoClose: 5000,
					closeOnClick: true,
				});
			} else {
				toast.update(id, {
					render: `Error: Server busy, try again`,
					type: 'error',
					isLoading: false,
					autoClose: 5000,
					closeOnClick: true,
				});
			}
		}
	};

	const handleToastClose = async () => {
		const { data } = await api.get('/users/user-profile');
		auth.setIsAuthorized(data);
		navigate('/');
	};

	const handleSubmitForm = (e) => {
		const newErrors = {
			username: {
				isErr: false,
				errMsg: '',
			},
			email: {
				isErr: false,
				errMsg: '',
			},
			password: {
				isErr: false,
				errMsg: '',
			},
			confirm_password: {
				isErr: false,
				errMsg: '',
			},
		};
		e.preventDefault();
		if (values.username === '')
			newErrors.username = {
				isErr: true,
				errMsg: 'Please enter the username',
			};
		else if (values.username.length < 5)
			newErrors.username = {
				isErr: true,
				errMsg: 'Length of username must be greater than 6 characters',
			};

		if (values.email === '')
			newErrors.email = { isErr: true, errMsg: 'Please enter the email' };
		else if (!values.email.match(/(\w+)@(\w+).(\w+)/))
			newErrors.email = { isErr: true, errMsg: 'Email is invalid' };

		if (values.password === '')
			newErrors.password = {
				isErr: true,
				errMsg: 'Please enter the password',
			};
		else if (values.password.length < 5)
			newErrors.password = {
				isErr: true,
				errMsg: 'Length of password must be greater than 6 characters',
			};
		if (values.confirm_password === '')
			newErrors.confirm_password = {
				isErr: true,
				errMsg: 'Please enter the confirm password',
			};
		else if (values.confirm_password !== values.password)
			newErrors.confirm_password = {
				isErr: true,
				errMsg: 'Passwords do not match',
			};

		setErrors(newErrors);

		const hasErrors = Object.values(newErrors).some((error) => error.isErr);

		if (!hasErrors) {
			handleRegisterAction();
		}
	};

	return (
		<>
			<form className='register-form'>
				{/* * HEADER */}
				<div className='register-form__header'>
					Create an new account
				</div>

				{/* * USERNAME */}
				<div className='register-form__group'>
					<label
						className='register-form__label'
						htmlFor='username'
					>
						Username
					</label>
					<input
						id='username'
						className='register-form__control'
						value={values.username}
						name='username'
						onChange={handleChangeValue}
						type='text'
						placeholder='Username'
					/>
					{errors.username.isErr && (
						<div className='register-form__validated'>
							{errors.username.errMsg}
						</div>
					)}
				</div>

				{/* * EMAIL */}
				<div className='register-form__group'>
					<label
						className='register-form__label'
						htmlFor='email'
					>
						Your email
					</label>
					<input
						id='email'
						className='register-form__control'
						value={values.email}
						name='email'
						onChange={handleChangeValue}
						type='email'
						placeholder='name@company.com'
					/>
					{errors.email.isErr && (
						<div className='register-form__validated'>
							{errors.email.errMsg}
						</div>
					)}
				</div>

				{/* * PASSWORD */}
				<div className='register-form__group'>
					<label
						className='register-form__label'
						htmlFor='password'
					>
						Password
					</label>
					<input
						id='password'
						className='register-form__control'
						value={values.password}
						name='password'
						onChange={handleChangeValue}
						type='password'
						placeholder='Password'
					/>
					{errors.password.isErr && (
						<div className='register-form__validated'>
							{errors.password.errMsg}
						</div>
					)}
				</div>

				{/* * CONFIRM PASSWORD */}
				<div className='register-form__group'>
					<label
						className='register-form__label'
						htmlFor='password'
					>
						Confirm password
					</label>
					<input
						id='confirm_password'
						className='register-form__control'
						value={values.confirm_password}
						name='confirm_password'
						onChange={handleChangeValue}
						type='password'
						placeholder='Password'
					/>
					{errors.confirm_password.isErr && (
						<div className='register-form__validated'>
							{errors.confirm_password.errMsg}
						</div>
					)}
				</div>

				{/* * BUTTON */}
				<div className='register-form__group'>
					<button
						onClick={handleSubmitForm}
						className='register-form__btn'
					>
						Register
					</button>
				</div>
				<div className='register-form__group'>
					Already have an account?{' '}
					<a
						className='register-form__link'
						href='/login'
					>
						Login
					</a>
				</div>
			</form>
		</>
	);
}
