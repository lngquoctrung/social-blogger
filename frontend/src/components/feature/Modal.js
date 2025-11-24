import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Modal.css';

export default function Modal({ isShow, setIsShow }) {
	const navigate = useNavigate();

	const handleOnClickEvent = (e) => {
		setIsShow(false);
		navigate(`/${e.target.name}`);
	};

	return (
		<div
			className={`modal__background ${
				isShow ? 'opacity-100 visible' : 'opacity-0 invisible'
			}`}
			onClick={() => setIsShow(false)}
		>
			<div
				className={`modal ${
					isShow ? 'scale-100 opacity-100' : 'scale-80 opacity-0'
				}`}
				onClick={(e) => e.stopPropagation()}
			>
				<div className='modal__header'>Oops!</div>
				<div className='modal__body'>
					Are you using a guest account? To perform the task, please
					log in.
				</div>
				<div className='modal__footer'>
					<button
						name='login'
						className='modal__button--success'
						onClick={handleOnClickEvent}
					>
						Login
					</button>
					<button
						name='register'
						className='modal__button--info'
						onClick={handleOnClickEvent}
					>
						Register
					</button>
					<button
						className='modal__button--secondary'
						onClick={() => setIsShow(false)}
					>
						Continue with guest account
					</button>
				</div>
			</div>
		</div>
	);
}
