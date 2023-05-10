import { combineReducers, createStore } from 'redux';
import reducerUser from './user/reducer';
import reducerCourses from './courses/reducer';
import reducerAuthors from './authors/reducer';

const rootReducer = combineReducers({
	user: reducerUser,
	courses: reducerCourses,
	authors: reducerAuthors,
});

const store = createStore(rootReducer);

export default store;
