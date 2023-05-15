import React from 'react';
import { BrowserRouter as Navigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { selectUser } from '../../store/selectors';

export default function PrivateRoute({ children }) {
	const user = useSelector(selectUser);
	const userRole = user.role;

	return userRole === 'admin' ? children : <Navigate to='/courses' />;
}
