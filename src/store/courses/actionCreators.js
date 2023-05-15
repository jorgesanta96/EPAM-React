import * as actions from './actionTypes';

export function coursesGotten(courses) {
	return {
		type: actions.GET_COURSES,
		payload: {
			courses,
		},
	};
}

export function courseUpdated({
	id,
	title,
	description,
	duration,
	creationDate,
	authors,
}) {
	return {
		type: actions.UPDATE_COURSE,
		payload: {
			id,
			title,
			description,
			duration,
			creationDate,
			authors,
		},
	};
}

export function courseDeleted(id) {
	return {
		type: actions.DELETE_COURSE,
		payload: {
			id,
		},
	};
}

export function courseCreated({
	id,
	title,
	description,
	creationDate,
	duration,
	authors,
}) {
	return {
		type: actions.SAVE_NEW_COURSE,
		payload: {
			id,
			title,
			description,
			creationDate,
			duration,
			authors,
		},
	};
}

export function coursesFound(searchInput) {
	return {
		type: actions.SEARCH_COURSES,
		payload: {
			searchInput,
		},
	};
}
