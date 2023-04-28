export default function deleteAuthorFromList(authorID, authorList) {
	// Check if authorList is an array with objects with id property, if not means that is an array with author id strings
	if (authorList[0].id) {
		return authorList.filter((author) => authorID !== author.id);
	}
	return authorList.filter((author) => authorID !== author);
}
