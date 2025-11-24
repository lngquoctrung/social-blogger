import React, { useState } from 'react';
import '../../styles/FeedbackForm.css';
import { RiErrorWarningLine } from 'react-icons/ri';

export default function FeedbackForm() {
	const [errors, setErrors] = useState({
		email: { isError: false, errMsg: '' },
		feedback: { isError: false, errMsg: '' },
	});

	const [values, setValues] = useState({
		email: '',
		feedback: '',
	});

	const handleSendFeedback = (e) => {
		e.preventDefault();
		if (values.email === '') {
			setErrors((prev) => {
				return {
					...prev,
					email: { isError: true, errMsg: 'Please enter your email' },
				};
			});
			return;
		} else if (values.feedback === '') {
			setErrors((prev) => {
				return {
					...prev,
					feedback: {
						isError: true,
						errMsg: 'Please enter your feedback',
					},
				};
			});
			return;
		}
	};

	const handleChangeValue = (e, type) => {
		if (type === 'email') {
			setErrors((prev) => {
				return {
					...prev,
					email: { isError: false, errMsg: '' },
				};
			});
			setValues((prev) => {
				return { ...prev, email: e.target.value };
			});
		} else {
			setErrors((prev) => {
				return {
					...prev,
					feedback: { isError: false, errMsg: '' },
				};
			});
			setValues((prev) => {
				return { ...prev, feedback: e.target.value };
			});
		}
	};

	return (
		<form>
			<div className='feedback-form__group'>
				<label
					className='feedback-form__label'
					htmlFor='email'
				>
					Email:
				</label>
				<input
					className='feedback-form__control'
					type='email'
					id='email'
					placeholder='abc@domain.com'
					value={values.email}
					onChange={(e) => handleChangeValue(e, 'email')}
				/>
				{errors.email.isError ? (
					<div className='feedback-form__valid'>
						<RiErrorWarningLine />
						{errors.email.errMsg}
					</div>
				) : (
					''
				)}
			</div>
			<div className='feedback-form__group'>
				<label
					className='feedback-form__label'
					htmlFor='feedback'
				>
					Feedback:
				</label>
				<textarea
					className='feedback-form__control'
					id='feedback'
					rows={3}
					value={values.feedback}
					onChange={(e) => handleChangeValue(e, 'textarea')}
				/>
				{errors.feedback.isError ? (
					<div className='feedback-form__valid'>
						<RiErrorWarningLine />
						{errors.feedback.errMsg}
					</div>
				) : (
					''
				)}
			</div>
			<div className='feedback-form__group'>
				<button onClick={handleSendFeedback}>Send</button>
			</div>
		</form>
	);
}
