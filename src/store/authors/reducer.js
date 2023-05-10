import * as actions from './actionTypes';

const authorsInitialState = []; // default value - empty array. After success getting authors from API - array of authors.

export default function reducer(state = authorsInitialState, action) {
	switch (action.type) {
		case actions.SAVE_NEW_AUTHOR:
			return [
				...state,
				{
					id: action.payload.id,
					name: action.payload.name,
				},
			];
		case actions.GET_AUTHORS:
			return action.payload.authors;
		default:
			return state;
	}
}
