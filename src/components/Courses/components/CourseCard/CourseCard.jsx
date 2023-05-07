import React from 'react';
import { Link } from 'react-router-dom';

import pipeDuration from '../../../../helpers/pipeDuration';
import dateGenerator from '../../../../helpers/dateGenerator';

import './courseCard.css';

function CourseCard(props) {
	const {
		id,
		title,
		duration,
		creationDate,
		description,
		authorsName,
		stateHeader,
	} = props;

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
			<Link to={`/courses/${id}`} state={stateHeader}>
				<button className='button'>Show course</button>
			</Link>
		</div>
	);
}

export default CourseCard;
