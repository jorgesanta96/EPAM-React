import { applyMiddleware, combineReducers, createStore } from 'redux';
import reducerUser from './user/reducer';
import reducerCourses from './courses/reducer';
import reducerAuthors from './authors/reducer';
import ReduxThunk from 'redux-thunk';

const rootReducer = combineReducers({
	user: reducerUser,
	courses: reducerCourses,
	authors: reducerAuthors,
});

const middleware = [ReduxThunk];
const store = createStore(rootReducer, applyMiddleware(...middleware));

export default store;
