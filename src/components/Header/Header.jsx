import React from 'react';
import Logo from './components/Logo/Logo';
import Button from '../../common/Button/Button';

import './header.css';

function Header() {
	return (
		<div className='header'>
			<Logo />
			<p>Jorge Santa</p>
			<Button buttonText='Logout' />
		</div>
	);
}

export default Header;
