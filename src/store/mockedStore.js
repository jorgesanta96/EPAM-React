const mockedState = {
	user: {
		isAuth: true,
		name: 'Test Name',
		token: 'testToken',
		role: 'admin',
	},
	courses: [
		{
			id: '000',
			title: 'test 1',
			description: 'test description',
			creationDate: '9/3/2021',
			duration: 120,
			authors: ['abc123'],
		},
		{
			id: '001',
			title: 'test 2',
			description: 'test description 2',
			creationDate: '22/5/2015',
			duration: 300,
			authors: ['xyx789'],
		},
	],
	authors: [
		{ id: 'abc123', name: 'author1' },
		{ id: 'xyx789', name: 'author2' },
	],
};

const mockedStore = {
	getState: () => mockedState,
	subscribe: jest.fn(),
	dispatch: jest.fn(),
};

export default mockedStore;
