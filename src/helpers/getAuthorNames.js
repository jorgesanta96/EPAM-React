export default function getAuthorNames(authorArrayIDs, authorsList) {
	let authorNamesArray = [];

	for (const id of authorArrayIDs) {
		const authorObject = authorsList.find((author) => {
			return id === author.id;
		});

		const nameAuthor = authorObject.name;
		authorNamesArray.push(nameAuthor);
	}

	return authorNamesArray;
}
