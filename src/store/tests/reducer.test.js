import reducerCourses from '../courses/reducer';
import * as actions from '../courses/actionTypes';

test('should return the initial state', () => {
	expect(reducerCourses(undefined, { type: undefined })).toEqual([]);
});

test('should handle SAVE_NEW_COURSE and returns a new state', () => {
	const previousState = [];
	const newCourse = {
		id: 'abc123',
		title: 'test 1',
		description: 'test description',
		creationDate: '9/3/2021',
		duration: 120,
		authors: ['author1', 'author2'],
	};

	expect(
		reducerCourses(previousState, {
			type: actions.SAVE_NEW_COURSE,
			payload: newCourse,
		})
	).toEqual([...previousState, newCourse]);
});

test('should handle GET_COURSES and returns a new state', () => {
	const previousState = [];
	const courses = [
		{
			id: 'abc123',
			title: 'test 1',
			description: 'test description',
			creationDate: '9/3/2021',
			duration: 120,
			authors: ['author1', 'author2'],
		},
		{
			id: 'xyz789',
			title: 'test 2',
			description: 'test string',
			creationDate: '10/8/2015',
			duration: 300,
			authors: ['author4', 'author5'],
		},
	];

	expect(
		reducerCourses(previousState, {
			type: actions.GET_COURSES,
			payload: {
				courses,
			},
		})
	).toEqual([...courses]);
});
