import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../../context/AppContext';
import '../../../styles/AboutPage.css';
import api from '../../../api/customAxios';
import {
	FaFacebookF,
	FaLinkedinIn,
	FaInstagram,
	FaTwitter,
	FaPhone,
	FaLocationArrow,
	FaBirthdayCake,
} from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';

export default function About() {
	const auth = useContext(AppContext);
	const navigate = useNavigate();
	const [values, setValues] = useState({
		username: '',
		email: '',
		avatar: '',
	});
	const handleLogout = async () => {
		try {
			await api.post('/users/logout');
			auth.setIsAuthorized(null);
			navigate('/');
		} catch (err) {
			console.error('Logout error:', err);
		}
	};

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const response = await api.get('/users/user-profile');
				const dataRes = response.data;
				if (dataRes.success) {
					const user = {
						username: dataRes.data.username,
						email: dataRes.data.email,
						avatar: dataRes.data.avatar,
					};
					setValues(user);
				} else {
					navigate('/');
				}
			} catch (err) {
				console.error(err);
			}
		};
		fetchUserData();
	}, [navigate]);

	const navItems = [
		{ name: 'About', active: true },
		{ name: 'Resume', active: false },
		{ name: 'Works', active: false },
		{ name: 'Blogs', active: false },
		{ name: 'Contact', active: false },
	];

	return (
		<div className='about__background'>
			<div className='about'>
				<div className='about__header'>Social Blogger</div>
				<div className='about__body'>
					<div className='profile-card'>
						<div className='profile-card__avatar'>
							<div className='avatar__frame'>
								<img
									src={values.avatar}
									alt='Profile'
									className='avatar__image'
								/>
							</div>
						</div>

						<h1 className='profile-card__name'>
							{values.username}
						</h1>

						{/* Social Links */}
						<div className='profile-card__contact'>
							<div className='profile-card__contact-item'>
								<FaFacebookF />
							</div>
							<div className='profile-card__contact-item'>
								<FaLinkedinIn />
							</div>
							<div className='profile-card__contact-item'>
								<FaInstagram />
							</div>
							<div className='profile-card__contact-item'>
								<FaTwitter />
							</div>
						</div>

						{/* Contact Info - Pushed to bottom */}
						<div className='profile-card__info'>
							<div className='profile-card__info-item'>
								<span>
									<FaPhone />
								</span>
								<span>+84 123456789</span>
							</div>
							<div className='profile-card__info-item'>
								<span>
									<SiGmail />
								</span>
								<span>{values.email}</span>
							</div>
							<div className='profile-card__info-item'>
								<span>
									<FaLocationArrow />
								</span>
								<span>Huu Tho Street, District 7</span>
							</div>
							<div className='profile-card__info-item'>
								<span>
									<FaBirthdayCake />
								</span>
								<span>20 May, 2002</span>
							</div>
						</div>
					</div>

					{/* Content Area */}
					<div className='profile-detail'>
						{/* Navigation */}
						<nav className='profile-detail__nav'>
							{navItems.map((item, index) => (
								<div
									key={index}
									className={`profile-detail__nav-item 
                    ${
						item.active
							? 'bg-black text-white'
							: 'bg-white hover:bg-gray-500 hover:text-white'
					}`}
								>
									{item.name}
								</div>
							))}
						</nav>

						{/* Content Section */}
						<div className='profile-detail__content'>
							<h2 className='profile-detail__header'>About Me</h2>
							<div className='profile-detail__body'>
								<p>
									Lorem ipsum dolor sit amet, consectetur
									adipiscing elit. Mauris orci nisi, gravida
									quis sem aliquet, semper vehicula enim.
									Proin facilisis, risus at molestie
									vulputate, leo ligula vehicula enim, ac
									tempor metus ex non erat. Vivamus vitae
									vestibulum lacus, id aliquet erat. Proin
									pulvinar fringilla fringilla. Integer ex
									orci, volutpat sed nisl at, commodo blandit
									nulla.
								</p>
								<p>
									Quisque ac rhoncus ligula. Sed luctus sit
									amet mi eu fringilla. Nulla rhoncus, diam
									vel scelerisque blandit, dolor sapien
									laoreet lacus, a ornare sapien augue in
									enim. Sed porta congue faucibus. Phasellus
									ac gravida diam, tristique vestibulum nisl.
								</p>
							</div>
						</div>
						<div>
							<button
								className='about__logout-btn'
								onClick={handleLogout}
							>
								Logout
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
