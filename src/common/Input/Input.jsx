import React from 'react';

import capitalizeFirstLetter from '../../helpers/capitalizeFirstLetter.js';

import './Input.css';

export default function Input(props) {
	const { labelText, inputType, placeholderText, minLength, onChange, value } =
		props;

	return (
		<div className='input'>
			<label htmlFor={labelText}>{capitalizeFirstLetter(labelText)}</label>
			<input
				type={inputType || 'text'}
				name={labelText}
				id={labelText}
				placeholder={placeholderText}
				minLength={minLength}
				value={value}
				onChange={onChange}
			/>
		</div>
	);
}
