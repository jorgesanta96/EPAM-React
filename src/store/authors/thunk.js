import { urlAPI } from '../../constants';

import { saveNewAuthor } from './actionCreators';

export function saveNewAuthorThunk(id, name) {
	return async (dispatch, getState) => {
		const response = await fetch(urlAPI + 'authors/add', {
			method: 'POST',
			body: JSON.stringify({
				name,
			}),
			headers: {
				'Content-Type': 'application/json',
				Authorization: getState().user.token,
			},
		});

		const result = await response.json();

		if (result.successful) {
			dispatch(saveNewAuthor(result.result));
		} else {
			console.log(result.result);
			throw new Error('Invalid ID');
		}
	};
}
