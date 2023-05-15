import { urlAPI } from '../../constants';

import { courseDeleted, courseUpdated, courseCreated } from './actionCreators';

export const courseDeletedThunk = (id) => {
	return async (dispatch, getState) => {
		const courseToDelete = getState().courses.filter(
			(course) => course.id === id
		);
		const idCourse = courseToDelete[0].id;

		const response = await fetch(urlAPI + `courses/${idCourse}`, {
			method: 'DELETE',
			headers: {
				Authorization: getState().user.token,
			},
		});

		const result = await response.json();

		if (result.successful) {
			dispatch(courseDeleted(id));
		} else {
			console.log(result.result);
			throw new Error('Invalid ID');
		}
	};
};

export const courseUpdatedThunk = ({
	id,
	title,
	description,
	duration,
	creationDate,
	authors,
}) => {
	return async (dispatch, getState) => {
		const courseToUpdate = getState().courses.filter(
			(course) => course.id === id
		)[0];
		const idCourse = courseToUpdate.id;

		const response = await fetch(urlAPI + `courses/${idCourse}`, {
			method: 'PUT',
			body: JSON.stringify({
				title,
				description,
				duration,
				authors,
			}),
			headers: {
				'Content-Type': 'application/json',
				Authorization: getState().user.token,
			},
		});

		const result = await response.json();

		if (result.successful) {
			dispatch(courseUpdated(result.result));
		} else {
			console.log(result.result);
			throw new Error('Invalid ID');
		}
	};
};

export const courseCreatedThunk = ({
	title,
	description,
	duration,
	authors,
}) => {
	return async (dispatch, getState) => {
		const response = await fetch(urlAPI + 'courses/add', {
			method: 'POST',
			body: JSON.stringify({
				title,
				description,
				duration,
				authors,
			}),
			headers: {
				'Content-Type': 'application/json',
				Authorization: getState().user.token,
			},
		});

		const result = await response.json();

		if (result.successful) {
			dispatch(courseCreated(result.result));
		} else {
			console.log(result.result);
			throw new Error('Invalid ID');
		}
	};
};
