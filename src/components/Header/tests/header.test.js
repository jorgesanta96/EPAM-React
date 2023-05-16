import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Provider } from 'react-redux';

import Header from '../Header';

import { BrowserRouter as Router } from 'react-router-dom';

import mockedStore from '../../../store/mockedStore';

test('displays Header', () => {
	render(
		<Provider store={mockedStore}>
			<Router>
				<Header />
			</Router>
		</Provider>
	);

	expect(screen.queryByText('Test Name')).toBeInTheDocument();
	expect(screen.getByAltText('logo')).toBeTruthy();
});
