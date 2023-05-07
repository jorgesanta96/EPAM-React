import React from 'react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import SearchBar from './components/SearchBar/SearchBar';
import CourseCard from './components/CourseCard/CourseCard';
import Button from '../../common/Button/Button';

import { mockedCoursesList, mockedAuthorsList } from '../../constants';
import getAuthorNames from '../../helpers/getAuthorNames';

import './courses.css';

export default function Courses() {
	const [courseList, setCourseList] = useState(mockedCoursesList);
	const [searchInput, setSearchInput] = useState('');

	const handleOnChange = (e) => {
		setSearchInput(e.target.value);

		if (e.target.value === '') {
			setCourseList(mockedCoursesList);
		}
	};

	const handleSearch = () => {
		const newCourseListByTitle = courseList.filter((course) => {
			return course.title.toLowerCase().includes(searchInput.toLowerCase());
		});
		const newCourseListByID = courseList.filter((course) => {
			return course.id.toLowerCase().includes(searchInput.toLowerCase());
		});

		if (newCourseListByTitle.length === 0 && newCourseListByID.length === 0) {
			setCourseList([]);
		}
		if (newCourseListByTitle.length > newCourseListByID.length) {
			setCourseList(newCourseListByTitle);
		} else {
			setCourseList(newCourseListByID);
		}
	};

	const location = useLocation();
	let isUserToken = '';

	if (localStorage.getItem('userToken')) {
		isUserToken = location.state.result;
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
					<Link to='/courses/add' state={location.state}>
						<Button buttonText='Add new course' />
					</Link>
				</div>
			</div>
			{courseList.map((course) => {
				return (
					<CourseCard
						key={course.id}
						authorsName={getAuthorNames(course.authors, mockedAuthorsList)}
						stateHeader={location.state}
						{...course}
					/>
				);
			})}
		</div>
	) : (
		<h1>Don't have access to this page</h1>
	);
}
