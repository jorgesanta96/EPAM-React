import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';

import pipeDuration from '../../helpers/pipeDuration';
import dateGenerator from '../../helpers/dateGenerator';
import getAuthorNames from '../../helpers/getAuthorNames';

import { mockedCoursesList, mockedAuthorsList } from '../../constants';

import './courseInfo.css';

export default function CourseInfo() {
	const [course, setCourse] = useState({
		id: '',
		title: '',
		description: '',
		creationDate: '',
		duration: '',
		authors: [],
	});
	const { courseId } = useParams();

	useEffect(() => {
		const newCourse = mockedCoursesList.find((course) => {
			return course.id === courseId;
		});

		setCourse(newCourse);
	}, [courseId]);

	const location = useLocation();
	let isUserToken = '';

	if (localStorage.getItem('userToken')) {
		isUserToken = location.state.result;
	}

	return isUserToken ? (
		<div className='courseInfo'>
			<Link to={'/courses'} state={location.state}>
				<button className='button'>Back to courses</button>
			</Link>
			<h1>{course.title}</h1>
			<p>{course.description}</p>
			<p>
				<strong>Authors: </strong>
				{getAuthorNames(course.authors, mockedAuthorsList).join(', ')}
			</p>
			<p>
				<strong>Duration: </strong>
				{pipeDuration(course.duration)} hours
			</p>
			<p>
				<strong>Created: </strong>
				{dateGenerator(course.creationDate)}
			</p>
		</div>
	) : (
		<h1>Don't have access to this page</h1>
	);
}
