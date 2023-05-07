import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import Logo from './components/Logo/Logo';
import Button from '../../common/Button/Button';

import './header.css';

function Header() {
	const [nameUser, setNameUser] = useState('');

	const location = useLocation();
	let isUserToken = '';

	useEffect(() => {
		if (localStorage.getItem('userToken')) {
			const { state } = location;
			setNameUser(state.user.name);
		}
	}, [location]);

	if (localStorage.getItem('userToken')) {
		isUserToken = location.state.result;
	}

	return isUserToken ? (
		<div className='header'>
			<Logo />
			<p>{nameUser}</p>
			<Link to='/login'>
				<Button
					buttonText='Logout'
					onClick={() => {
						localStorage.removeItem('userToken');
					}}
				/>
			</Link>
		</div>
	) : (
		<div className='header'>
			<Logo />
		</div>
	);
}

export default Header;
