import React from 'react';
import { Link } from 'react-router-dom';

import Button from '../../../../common/Button/Button';

import pipeDuration from '../../../../helpers/pipeDuration';
import dateGenerator from '../../../../helpers/dateGenerator';

import store from '../../../../store';

import { useSelector } from 'react-redux';
import { selectUser } from '../../../../store/selectors';

import { courseDeletedThunk } from '../../../../store/courses/thunk';

import './courseCard.css';

function CourseCard(props) {
	const { id, title, duration, creationDate, description, authorsName } = props;

	const user = useSelector(selectUser);
	const isUserAdmin = user.role === 'admin';

	return isUserAdmin ? (
		<div className='courseCard'>
			<h1>{title}</h1>
			<p>{description}</p>
			<p>
				<strong>Authors: </strong>
				{authorsName.join(', ')}
			</p>
			<p>
				<strong>Duration: </strong>
				{pipeDuration(duration)} hours
			</p>
			<p>
				<strong>Created: </strong>
				{dateGenerator(creationDate)}
			</p>
			<Link to={`/courses/${id}`}>
				<button className='button'>Show course</button>
			</Link>
			<Link to={`/courses/update/${id}`}>
				<Button buttonText='Edit course' />
			</Link>
			<Button
				buttonText='Delete course'
				onClick={() => store.dispatch(courseDeletedThunk(id))}
			/>
		</div>
	) : (
		<div className='courseCard'>
			<h1>{title}</h1>
			<p>{description}</p>
			<p>
				<strong>Authors: </strong>
				{authorsName.join(', ')}
			</p>
			<p>
				<strong>Duration: </strong>
				{pipeDuration(duration)} hours
			</p>
			<p>
				<strong>Created: </strong>
				{dateGenerator(creationDate)}
			</p>
			<Link to={`/courses/${id}`}>
				<button className='button'>Show course</button>
			</Link>
		</div>
	);
}

export default CourseCard;
