import React from 'react';
import { Link } from 'react-router-dom';

import Button from '../../../../common/Button/Button';

import pipeDuration from '../../../../helpers/pipeDuration';
import dateGenerator from '../../../../helpers/dateGenerator';

import store from '../../../../store';
import { courseDeleted } from '../../../../store/courses/actionCreators';

import './courseCard.css';

function CourseCard(props) {
	const { id, title, duration, creationDate, description, authorsName } = props;

	return (
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
			<Button
				buttonText='Edit course'
				onClick={() => console.log('edit course implemented later')}
			/>
			<Button
				buttonText='Delete course'
				onClick={() => store.dispatch(courseDeleted(id))}
			/>
		</div>
	);
}

export default CourseCard;
