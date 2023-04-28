import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import Description from './components/Description/Description';
import AuthorCourseButton from './components/AuthorCourseButton/AuthorCourseButton';
import Courses from '../Courses/Courses';

import { mockedAuthorsList, mockedCoursesList } from '../../constants';
import getAuthorNameByID from '../../helpers/getAuthorNameByID';
import deleteAuthorFromList from '../../helpers/deleteAuthorFromList';
import pipeDuration from '../../helpers/pipeDuration';

const CreateCourse = () => {
	const [course, setCourse] = useState({
		id: '',
		title: '',
		description: '',
		creationDate: '',
		duration: '',
		authors: [],
	});

	const [author, setAuthor] = useState({
		id: '',
		name: '',
	});

	const [authorsList, setAuthorsList] = useState([...mockedAuthorsList]);
	const [showCreateCourse, setShowCreateCourse] = useState(true);

	// eslint-disable-next-line prettier/prettier
	const creationDate = `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`;

	return showCreateCourse ? (
		<div className='courses'>
			<Input
				labelText='Title'
				placeholderText='Enter title...'
				value={course.title}
				onChange={(e) =>
					setCourse({
						...course,
						id: uuidv4(),
						title: e.target.value,
						creationDate: creationDate,
					})
				}
			/>
			<Button
				buttonText='Create course'
				onClick={() => {
					if (course.title.length < 1 || course.authors.length < 1) {
						alert('Please fill all the fields');
					} else if (course.duration < 0 || course.duration === '') {
						alert('Duration should be more than 0 minutes');
					} else if (course.description.length < 2) {
						alert('Description length should be at least 2 characters');
					} else {
						mockedCoursesList.push(course);
						setShowCreateCourse(false);
					}
				}}
			/>
			<Description
				minLength={2}
				value={course.description}
				onChange={(e) => setCourse({ ...course, description: e.target.value })}
			/>
			<div className='createCourseAuthors'>
				<div>
					Authors
					{authorsList.map((author) => {
						return (
							<AuthorCourseButton
								key={author.id}
								authorName={author.name}
								buttonText='Add author'
								onClick={() => {
									setCourse({
										...course,
										authors: [...course.authors, author.id],
									});
									setAuthorsList(deleteAuthorFromList(author.id, authorsList));
								}}
							/>
						);
					})}
				</div>
				<div>
					Course authors
					{course.authors.map((authorID) => {
						const authorName = getAuthorNameByID(authorID, mockedAuthorsList);
						return (
							<AuthorCourseButton
								key={authorID}
								authorName={authorName}
								buttonText='Delete author'
								onClick={() => {
									setAuthorsList([
										...authorsList,
										{ id: authorID, name: authorName },
									]);
									setCourse({
										...course,
										authors: deleteAuthorFromList(authorID, course.authors),
									});
								}}
							/>
						);
					})}
				</div>
				<div>
					Add author
					<Input
						labelText='Author name'
						placeholderText='Enter author name...'
						minLength={2}
						value={author.name}
						onChange={(e) => setAuthor({ id: uuidv4(), name: e.target.value })}
					/>
					<Button
						buttonText='Create author'
						onClick={() => {
							if (author.name.length >= 2) {
								setAuthorsList([...authorsList, author]);
								mockedAuthorsList.push(author);
							} else {
								alert('Author name length should be at least 2 characters');
							}
						}}
					/>
				</div>
				<div>
					Duration
					<Input
						labelText='Duration'
						inputType='number'
						placeholderText='Enter duration in minutes...'
						value={course.duration}
						onChange={(e) => setCourse({ ...course, duration: e.target.value })}
					/>
					<p>Duration: {pipeDuration(course.duration)} hours</p>
				</div>
			</div>
		</div>
	) : (
		<Courses />
	);
};

export default CreateCourse;
