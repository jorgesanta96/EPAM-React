import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';

import { urlAPI } from '../../constants';

import './login.css';

export default function Login() {
	const [user, setUser] = useState({ email: '', password: '' });
	const [isLoggedinUser, setIsLoggedinUser] = useState(false);
	const navigate = useNavigate();

	const handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setUser({ ...user, [name]: value });
	};

	const loginUser = async (user) => {
		const response = await fetch(urlAPI + 'login', {
			method: 'POST',
			body: JSON.stringify(user),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const result = await response.json();

		if (result.successful) {
			// console.log(response);
			console.log(result);
			return result;
		} else {
			console.log(result.result);
			throw new Error('Invalid Authentication data');
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (user.email && user.password) {
			setIsLoggedinUser(true);
		}
	};

	useEffect(() => {
		if (isLoggedinUser) {
			loginUser(user).then((data) => {
				localStorage.setItem('userToken', data.result);
				navigate('/courses', { state: data });
			});
		}
	});

	return (
		<form className='form' onSubmit={handleSubmit}>
			<h1>Login</h1>
			<Input
				labelText='email'
				placeholderText='Enter email...'
				inputType='email'
				value={user.email}
				onChange={handleChange}
			/>
			<Input
				labelText='password'
				placeholderText='Enter password...'
				inputType='password'
				value={user.password}
				onChange={handleChange}
			/>
			<div>
				<Button buttonText='Login' buttonType='submit' />
			</div>
			<p>
				If you don't have an account,{' '}
				<Link to='/registration'>Register here</Link>
			</p>
		</form>
	);
}
