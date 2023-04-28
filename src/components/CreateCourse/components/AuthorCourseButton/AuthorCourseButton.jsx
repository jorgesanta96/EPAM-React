import React from 'react';
import Button from '../../../../common/Button/Button';

export default function AuthorCourseButton(props) {
	const { authorName, buttonText, onClick } = props;
	return (
		<>
			{authorName}
			<Button buttonText={buttonText} onClick={onClick} />
		</>
	);
}
