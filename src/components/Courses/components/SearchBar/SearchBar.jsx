import React from 'react';
import Input from '../../../../common/Input/Input';
import Button from '../../../../common/Button/Button';

export default function SearchBar(props) {
	const { onClick, onChange, value } = props;
	return (
		<>
			<Input
				placeholderText='Enter course name...'
				onChange={onChange}
				value={value}
			/>
			<Button buttonText='Search' onClick={onClick} />
		</>
	);
}
