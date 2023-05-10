import * as actions from './actionTypes';

export function userLoggedin(name, email) {
	return {
		type: actions.USER_LOGGEDIN,
		payload: {
			name,
			email,
		},
	};
}

export function userLoggedout() {
	return {
		type: actions.USER_LOGGEDOUT,
	};
}
