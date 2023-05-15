import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from 'react-router-dom';

import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import CourseForm from './components/CourseForm/CourseForm';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import CourseInfo from './components/CourseInfo/CourseInfo';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

function App() {
	return (
		<Router>
			<Header />
			<Routes>
				<Route exact path='/' element={<Navigate to='/login' />} />
				<Route path='/login' element={<Login />} />
				<Route path='/registration' element={<Registration />} />
				<Route path='/courses' element={<Courses />} />
				<Route
					path='/courses/add'
					element={
						<PrivateRoute>
							<CourseForm typeForm='Create' />
						</PrivateRoute>
					}
				/>
				<Route path='/courses/:courseId' element={<CourseInfo />} />
				<Route
					path='/courses/update/:courseId'
					element={
						<PrivateRoute>
							<CourseForm typeForm='Update' />
						</PrivateRoute>
					}
				/>
			</Routes>
		</Router>
	);
}

export default App;
