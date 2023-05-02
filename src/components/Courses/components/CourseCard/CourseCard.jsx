import React from 'react';

import pipeDuration from '../../../../helpers/pipeDuration';
import dateGenerator from '../../../../helpers/dateGenerator';

import './courseCard.css';

function CourseCard(props) {
	const { title, duration, creationDate, description, authorsName } = props;
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
			<button className='button'>Show course</button>
		</div>
	);
}

export default CourseCard;
