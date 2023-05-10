import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import pipeDuration from '../../helpers/pipeDuration';
import dateGenerator from '../../helpers/dateGenerator';
import getAuthorNames from '../../helpers/getAuthorNames';

import { useSelector } from 'react-redux';
import {
	selectCourses,
	selectAuthors,
	selectUser,
} from '../../store/selectors';

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

	const courses = useSelector(selectCourses);
	const authors = useSelector(selectAuthors);
	const user = useSelector(selectUser);

	useEffect(() => {
		const newCourse = courses.find((course) => {
			return course.id === courseId;
		});

		setCourse(newCourse);
	}, [courseId, courses]);

	let isUserToken = '';

	if (user.isAuth) {
		isUserToken = user.token;
	}

	return isUserToken ? (
		<div className='courseInfo'>
			<Link to={'/courses'}>
				<button className='button'>Back to courses</button>
			</Link>
			<h1>{course.title}</h1>
			<p>{course.description}</p>
			<p>
				<strong>Authors: </strong>
				{getAuthorNames(course.authors, authors).join(', ')}
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
