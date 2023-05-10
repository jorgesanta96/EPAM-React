import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import SearchBar from './components/SearchBar/SearchBar';
import CourseCard from './components/CourseCard/CourseCard';
import Button from '../../common/Button/Button';

import getAuthorNames from '../../helpers/getAuthorNames';

import './courses.css';

import { useSelector } from 'react-redux';
import {
	selectCourses,
	selectAuthors,
	selectUser,
} from '../../store/selectors';

import store from '../../store';
import {
	coursesGotten,
	coursesFound,
} from '../../store/courses/actionCreators';

export default function Courses() {
	const courses = useSelector(selectCourses);
	const authors = useSelector(selectAuthors);
	const user = useSelector(selectUser);

	const [courseList, setCourseList] = useState(courses);
	const [searchInput, setSearchInput] = useState('');

	const handleOnChange = (e) => {
		setSearchInput(e.target.value);

		if (e.target.value === '') {
			// setCourseList(courses);
			store.dispatch(coursesGotten(courseList));
		}
	};

	const handleSearch = () => {
		store.dispatch(coursesFound(searchInput));
	};

	let isUserToken = '';

	if (user.isAuth) {
		isUserToken = user.token;
	}

	return isUserToken ? (
		<div className='courses'>
			<div className='searchBar'>
				<SearchBar
					onClick={handleSearch}
					onChange={handleOnChange}
					value={searchInput}
				/>
				<div className='addCourseButton'>
					<Link to='/courses/add'>
						<Button buttonText='Add new course' />
					</Link>
				</div>
			</div>
			{courses.map((course) => {
				return (
					<CourseCard
						key={course.id}
						authorsName={getAuthorNames(course.authors, authors)}
						{...course}
					/>
				);
			})}
		</div>
	) : (
		<h1>Don't have access to this page</h1>
	);
}
