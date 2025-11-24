import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import api from '../../api/customAxios';
import '../../styles/LoginForm.css';
import 'react-toastify/dist/ReactToastify.css';

export default function LoginForm({ toast }) {
	const auth = useContext(AppContext);
	const [values, setValues] = useState({
		email: '',
		password: '',
	});

	const [isChecked, setIsChecked] = useState(false);
	const [errors, setErrors] = useState({
		email: {
			isErr: false,
			errMsg: '',
		},
		password: {
			isErr: false,
			errMsg: '',
		},
	});

	const handleChangeValue = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
		setErrors({ ...errors, [e.target.name]: { isErr: false } });
	};

	const navigate = useNavigate();

	const handleLoginAction = async () => {
		const id = toast.loading('Loading...');

		await new Promise((resolve) => setTimeout(resolve, 1000));
		try {
			const response = await api.post('/users/login', {
				email: values.email,
				password: values.password,
			});
			const resData = response.data;
			if (resData.success) {
				// Login success
				toast.update(id, {
					render: 'Login Successful!',
					type: 'success',
					isLoading: false,
					autoClose: 2000,
					closeOnClick: true,
					onClose: () => handleToastClose(),
				});
			}
		} catch (err) {
			if (err.status === 404) {
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
		try {
			const { data } = await api.get('/users/user-profile');
			auth.setIsAuthorized(data);
			navigate('/');
		} catch (err) {
			console.log(err);
		}
	};

	const handleSubmitForm = (e) => {
		e.preventDefault();
		const newErrors = {
			email: {
				isErr: false,
				errMsg: '',
			},
			password: {
				isErr: false,
				errMsg: '',
			},
		};

		if (values.email === '')
			newErrors.email = { isErr: true, errMsg: 'Please enter the email' };
		else if (!values.email.match(/(\w+)@(\w+).(\w+)/)) {
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
		}
		setErrors(newErrors);

		const hasError = Object.values(newErrors).some((error) => error.isErr);
		if (!hasError) {
			// TODO CALL API
			handleLoginAction();
		}
	};

	return (
		<>
			<form className='login-form'>
				{/* * HEADER */}
				<div className='login-form__header'>
					Sign in to your account
				</div>

				{/* * EMAIL */}
				<div className='login-form__group'>
					<label
						className='login-form__label'
						htmlFor='email'
					>
						Your email
					</label>
					<input
						id='email'
						className='login-form__control'
						value={values.email}
						name='email'
						onChange={handleChangeValue}
						type='email'
						placeholder='name@company.com'
					/>
					{errors.email.isErr && (
						<div className='login-form__validated'>
							{errors.email.errMsg}
						</div>
					)}
				</div>

				{/* * PASSWORD */}
				<div className='login-form__group'>
					<label
						className='login-form__label'
						htmlFor='password'
					>
						Password
					</label>
					<input
						id='password'
						className='login-form__control'
						value={values.password}
						name='password'
						onChange={handleChangeValue}
						type='password'
						placeholder='Password'
					/>
					{errors.password.isErr && (
						<div className='login-form__validated'>
							{errors.password.errMsg}
						</div>
					)}
				</div>

				{/* * REMEMBER AND RESET PASSWORD */}
				<div className='login-form__group login-form__group--flex'>
					<div className='login-form__group-check'>
						<input
							id='remember'
							className='login-form__check'
							name='remember'
							onChange={() => setIsChecked(!isChecked)}
							type='checkbox'
							checked={isChecked}
						/>
						<label
							className='login-form__label'
							htmlFor='remember'
						>
							Remember me
						</label>
					</div>

					<div>
						<a
							className='login-form__link'
							href='/register'
						>
							Forgot password?
						</a>
					</div>
				</div>

				{/* * BUTTON */}
				<div className='login-form__group'>
					<button
						onClick={handleSubmitForm}
						className='login-form__btn'
					>
						Login
					</button>
				</div>
				<div className='login-form__group'>
					Don't have an account yet?{' '}
					<a
						className='login-form__link'
						href='/register'
					>
						Sign up
					</a>
				</div>
			</form>
		</>
	);
}
