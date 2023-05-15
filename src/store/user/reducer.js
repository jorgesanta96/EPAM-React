import * as actions from './actionTypes';

const userInitialState = {
	isAuth: false, // default value - false. After success login - true
	name: '', // default value - empty string. After success login - name of user
	email: '', // default value - empty string. After success login - email of user
	token: '', // default value - empty string or token value from localStorage.
	role: '',
	// After success login - value from API /login response. See Swagger.
};

export default function reducer(state = userInitialState, action) {
	if (action.type === actions.USER_LOGGEDIN) {
		return {
			isAuth: true,
			name: action.payload.name,
			email: action.payload.email,
			token: localStorage.getItem('userToken'),
			role: action.payload.role,
		};
	} else if (action.type === actions.USER_LOGGEDOUT) {
		return userInitialState;
	}

	return state;
}
