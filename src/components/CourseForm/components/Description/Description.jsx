import React from 'react';

import './description.css';

export default function Description(props) {
	const { minLenght, value, onChange } = props;
	return (
		<div className='description'>
			<label htmlFor='description'>Description</label>
			<textarea
				name='description'
				id='description'
				placeholder='Enter description...'
				minLength={minLenght}
				value={value}
				onChange={onChange}
			></textarea>
		</div>
	);
}
