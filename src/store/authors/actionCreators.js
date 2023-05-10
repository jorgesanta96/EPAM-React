import * as actions from './actionTypes';

export function saveNewAuthor(id, name) {
	return {
		type: actions.SAVE_NEW_AUTHOR,
		payload: {
			id,
			name,
		},
	};
}

export function authorsGotten(authors) {
	return {
		type: actions.GET_AUTHORS,
		payload: {
			authors,
		},
	};
}
