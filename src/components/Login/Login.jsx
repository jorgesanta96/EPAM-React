import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import store from '../../store';
import { userLoggedin } from '../../store/user/actionCreators';
import { getAuthors, getCourses } from '../../store/services';
import { coursesGotten } from '../../store/courses/actionCreators';
import { authorsGotten } from '../../store/authors/actionCreators';

import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';

import { urlAPI } from '../../constants';

import './login.css';

import { userLoggedinThunk } from '../../store/user/thunk';

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
				store.dispatch(
					userLoggedin(data.user.name, data.user.email, data.user.role)
				);
				store.dispatch(userLoggedinThunk);
				navigate('/courses');
			});
		}
	});

	useEffect(() => {
		getCourses().then((courses) => {
			store.dispatch(coursesGotten(courses));
		});
		getAuthors().then((authors) => {
			store.dispatch(authorsGotten(authors));
		});
	}, []);

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
