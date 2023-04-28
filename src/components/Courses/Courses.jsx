import React from 'react';
import { useState } from 'react';

import SearchBar from './components/SearchBar/SearchBar';
import CourseCard from './components/CourseCard/CourseCard';
import Button from '../../common/Button/Button';
import CreateCourse from '../CreateCourse/CreateCourse';

import { mockedCoursesList, mockedAuthorsList } from '../../constants';
import getAuthorNames from '../../helpers/getAuthorNames';

export default function Courses() {
	const [courseList, setCourseList] = useState(mockedCoursesList);
	const [searchInput, setSearchInput] = useState('');
	const [showCourses, setShowCourses] = useState(true);

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

	return showCourses ? (
		<div className='courses'>
			<SearchBar
				onClick={handleSearch}
				onChange={handleOnChange}
				value={searchInput}
			/>
			<Button
				buttonText='Add new course'
				onClick={() => setShowCourses(false)}
			/>
			{courseList.map((course) => {
				return (
					<CourseCard
						key={course.id}
						authorsName={getAuthorNames(course.authors, mockedAuthorsList)}
						{...course}
					/>
				);
			})}
		</div>
	) : (
		<CreateCourse />
	);
}
