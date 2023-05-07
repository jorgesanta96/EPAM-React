import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';

import { urlAPI } from '../../constants';

export default function Registration() {
	const [user, setUser] = useState({ name: '', email: '', password: '' });
	const [isRegisteredUser, setIsRegisteredUser] = useState(false);
	const navigate = useNavigate();

	const handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setUser({ ...user, [name]: value });
	};

	const registerUser = async (user) => {
		const response = await fetch(urlAPI + 'register', {
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
			setIsRegisteredUser(true);
		} else {
			console.log(result.errors);
			throw new Error('Bad Request');
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (user.name && user.email && user.password) {
			registerUser(user);
		}
	};

	useEffect(() => {
		if (isRegisteredUser) {
			navigate('/login');
		}
	});

	return (
		<form className='form' onSubmit={handleSubmit}>
			<h1>Registration</h1>
			<Input
				labelText='name'
				placeholderText='Enter name...'
				value={user.name}
				onChange={handleChange}
			/>
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
				<Button buttonText='Registration' buttonType='submit' />
			</div>
			<p>
				If you have an account, <Link to='/login'>Login here</Link>
			</p>
		</form>
	);
}
