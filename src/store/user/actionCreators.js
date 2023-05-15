import * as actions from './actionTypes';

export function userLoggedin(name, email, role) {
	return {
		type: actions.USER_LOGGEDIN,
		payload: {
			name,
			email,
			role,
		},
	};
}

export function userLoggedout() {
	return {
		type: actions.USER_LOGGEDOUT,
	};
}
