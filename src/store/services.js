import { urlAPI } from '../constants';

export const getCourses = async () => {
	const response = await fetch(urlAPI + 'courses/all');

	const result = await response.json();

	if (result.successful) {
		// console.log(result);
		return result.result;
	} else {
		console.log(result.result);
		throw new Error('Invalid request');
	}
};

export const getAuthors = async () => {
	const response = await fetch(urlAPI + 'authors/all');

	const result = await response.json();

	if (result.successful) {
		// console.log(result);
		return result.result;
	} else {
		console.log(result.result);
		throw new Error('Invalid request');
	}
};
