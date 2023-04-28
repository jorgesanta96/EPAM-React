export default function getAuthorNameByID(authorID, authorsList) {
	const author = authorsList.find((author) => {
		return authorID === author.id;
	});

	return author.name;
}
