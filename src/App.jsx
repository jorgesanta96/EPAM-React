import React, { useEffect, useState } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from 'react-router-dom';

import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import CreateCourse from './components/CreateCourse/CreateCourse';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import CourseInfo from './components/CourseInfo/CourseInfo';

function App() {
	const [userToken, setUserToken] = useState();

	useEffect(() => {
		setUserToken(localStorage.getItem('userToken'));
	}, [userToken]);

	return (
		<Router>
			<Header />
			<Routes>
				<Route exact path='/' element={<Navigate to='/login' />} />
				<Route path='/login' element={<Login />} />
				<Route path='/registration' element={<Registration />} />
				<Route path='/courses' element={<Courses />} />
				<Route path='/courses/add' element={<CreateCourse />} />
				<Route path='/courses/:courseId' element={<CourseInfo />} />
			</Routes>
		</Router>
	);
}

export default App;
