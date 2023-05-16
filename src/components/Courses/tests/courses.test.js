import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Provider } from 'react-redux';

import Courses from '../Courses';
import CourseForm from '../../CourseForm/CourseForm';
import PrivateRoute from '../../PrivateRoute/PrivateRoute';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import mockedStore from '../../../store/mockedStore';

test('Should display CourseCard correctly', async () => {
	render(
		<Provider store={mockedStore}>
			<Router>
				<Courses />
			</Router>
		</Provider>
	);

	expect(screen.queryByText('test 1')).toBeInTheDocument();
	expect(screen.queryByText('test description')).toBeInTheDocument();
	expect(screen.queryByText('9.3.2021')).toBeInTheDocument();
	expect(screen.queryByText('2:00 hours')).toBeInTheDocument();
	expect(screen.queryByText('author1')).toBeInTheDocument();
});

test('Should display amount of CourseCard equal length of courses array', () => {
	render(
		<Provider store={mockedStore}>
			<Router>
				<Courses />
			</Router>
		</Provider>
	);

	expect(
		screen.getAllByTestId('courseCard').length ===
			mockedStore.getState().courses.length
	);
});

test('CourseForm should be showed after a click on a button "Add new course"', async () => {
	render(
		<Provider store={mockedStore}>
			<Router>
				<Routes>
					<Route exact path='/' element={<Navigate to='/courses' />} />
					<Route path='/courses' element={<Courses />} />
					<Route
						path='/courses/add'
						element={
							<PrivateRoute>
								<CourseForm typeForm='Create' />
							</PrivateRoute>
						}
					/>
				</Routes>
			</Router>
		</Provider>
	);

	const button = screen.queryByText('Add new course');
	expect(button).toBeInTheDocument();

	fireEvent.click(button);
	expect(screen.queryByText('Create course')).toBeInTheDocument();
});
