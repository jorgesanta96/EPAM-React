import * as actions from './actionTypes';

const coursesInitialState = []; // default value - empty array. After success getting courses from API - array of courses.

export default function reducer(state = coursesInitialState, action) {
	switch (action.type) {
		case actions.SAVE_NEW_COURSE:
			return [
				...state,
				{
					id: action.payload.id,
					title: action.payload.title,
					description: action.payload.description,
					creationDate: action.payload.creationDate,
					duration: action.payload.duration,
					authors: action.payload.authors,
				},
			];
		case actions.DELETE_COURSE:
			return state.filter((course) => course.id !== action.payload.id);
		case actions.UPDATE_COURSE:
			console.log('Update Course functionality havent been implemented');
			return state;
		case actions.GET_COURSES:
			return action.payload.courses;
		case actions.SEARCH_COURSES:
			const newCourseListByTitle = state.filter((course) => {
				return course.title
					.toLowerCase()
					.includes(action.payload.searchInput.toLowerCase());
			});
			const newCourseListByID = state.filter((course) => {
				return course.id
					.toLowerCase()
					.includes(action.payload.searchInput.toLowerCase());
			});
			if (newCourseListByTitle.length === 0 && newCourseListByID.length === 0) {
				return [];
			}
			if (newCourseListByTitle.length > newCourseListByID.length) {
				return newCourseListByTitle;
			} else {
				return newCourseListByID;
			}
		default:
			return state;
	}
}
