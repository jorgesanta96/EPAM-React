import React from 'react';
import { Link } from 'react-router-dom';

import store from '../../store';
import { userLoggedout } from '../../store/user/actionCreators';
import { selectUser } from '../../store/selectors';
import { useSelector, useDispatch } from 'react-redux';

import Logo from './components/Logo/Logo';
import Button from '../../common/Button/Button';

import './header.css';

function Header() {
	const user = useSelector(selectUser);
	const dispatch = useDispatch();

	let isUserToken = '';
	let nameUser = '';

	if (user.isAuth) {
		nameUser = user.name;
		isUserToken = user.token;
	}

	// To see the store state, everytime it changes.
	// store.subscribe(() => {
	// 	console.log('Store changed', store.getState());
	// });

	return isUserToken ? (
		<div className='header'>
			<Logo />
			<p>{nameUser}</p>
			<Link to='/login'>
				<Button
					buttonText='Logout'
					onClick={() => {
						localStorage.removeItem('userToken');
						dispatch(userLoggedout());
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
