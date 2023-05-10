import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import Description from './components/Description/Description';
import AuthorCourseButton from './components/AuthorCourseButton/AuthorCourseButton';

import getAuthorNameByID from '../../helpers/getAuthorNameByID';
import deleteAuthorFromList from '../../helpers/deleteAuthorFromList';
import pipeDuration from '../../helpers/pipeDuration';

import store from '../../store';
import { courseCreated } from '../../store/courses/actionCreators';
import { saveNewAuthor } from '../../store/authors/actionCreators';

import { useSelector } from 'react-redux';
import { selectAuthors, selectUser } from '../../store/selectors';

import './createCourse.css';

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

	const authors = useSelector(selectAuthors);
	const user = useSelector(selectUser);

	const [authorsList, setAuthorsList] = useState(authors);
	const [createCourse, setCreateCourse] = useState(false);
	const navigate = useNavigate();

	// eslint-disable-next-line prettier/prettier
	const creationDate = `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`;

	const handleSubmit = () => {
		if (course.title.length < 1 || course.authors.length < 1) {
			alert('Please fill all the fields');
		} else if (course.duration <= 0 || course.duration === '') {
			alert('Duration should be more than 0 minutes');
		} else if (course.description.length < 2) {
			alert('Description length should be at least 2 characters');
		} else {
			// mockedCoursesList.push(course);
			store.dispatch(
				courseCreated(
					course.id,
					course.title,
					course.description,
					course.creationDate,
					course.duration,
					course.authors
				)
			);
			setCreateCourse(true);
		}
	};

	useEffect(() => {
		if (createCourse) {
			navigate('/courses');
		}
	});

	let isUserToken = '';

	if (user.isAuth) {
		isUserToken = user.token;
	}

	return isUserToken ? (
		<div className='courses'>
			<div className='createCourse'>
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
				<div className='createCourseButton'>
					<Button buttonText='Create course' onClick={handleSubmit} />
				</div>
			</div>
			<Description
				minLength={2}
				value={course.description}
				onChange={(e) => setCourse({ ...course, description: e.target.value })}
			/>
			<div className='createCourseAuthors'>
				<div className='addAuthorDiv'>
					<h4>Add author</h4>
					<Input
						labelText='Author name'
						placeholderText='Enter author name...'
						minLength={2}
						value={author.name}
						onChange={(e) => setAuthor({ id: uuidv4(), name: e.target.value })}
					/>
					<div className='addAuthorButton'>
						<Button
							buttonText='Create author'
							onClick={() => {
								if (author.name.length >= 2) {
									setAuthorsList([...authorsList, author]);
									// mockedAuthorsList.push(author);
									store.dispatch(saveNewAuthor(author.id, author.name));
								} else {
									alert('Author name length should be at least 2 characters');
								}
							}}
						/>
					</div>
				</div>
				<div className='durationDiv'>
					<h4>Duration</h4>
					<Input
						labelText='Duration'
						inputType='number'
						placeholderText='Enter duration in minutes...'
						value={course.duration}
						onChange={(e) =>
							setCourse({ ...course, duration: parseInt(e.target.value) })
						}
					/>
					<p>
						Duration: <b>{pipeDuration(course.duration)}</b> hours
					</p>
				</div>
				<div className='listAuthorsDiv'>
					<h4>Authors</h4>
					<ul className='listAuthors'>
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
										setAuthorsList(
											deleteAuthorFromList(author.id, authorsList)
										);
									}}
								/>
							);
						})}
					</ul>
				</div>
				<div className='courseAuthorsDiv'>
					<h4>Course authors</h4>
					<ul className='listAuthors'>
						{course.authors.map((authorID) => {
							const authorName = getAuthorNameByID(authorID, authors);
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
					</ul>
				</div>
			</div>
		</div>
	) : (
		<h1>Don't have access to this page</h1>
	);
};

export default CreateCourse;
