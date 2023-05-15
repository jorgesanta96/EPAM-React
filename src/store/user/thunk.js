import { userLoggedout, userLoggedin } from './actionCreators';

import { urlAPI } from '../../constants';

export async function userLoggedoutThunk(dispatch, getState) {
	await fetch(urlAPI + 'logout', {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: getState().user.token,
		},
	});
	dispatch(userLoggedout());
}

export const userLoggedinThunk = async (dispatch, getState) => {
	const response = await fetch(urlAPI + 'users/me', {
		method: 'GET',
		headers: {
			Authorization: getState().user.token,
		},
	});

	const result = await response.json();

	if (result.successful) {
		dispatch(
			userLoggedin(result.result.name, result.result.email, result.result.role)
		);
	} else {
		console.log(result.result);
		throw new Error('Invalid Authentication data');
	}
};
