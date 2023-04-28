import React from 'react';

export default function Description(props) {
	const { minLenght, value, onChange } = props;
	return (
		<div className='textarea'>
			<label htmlFor='description'>Description</label>
			<textarea
				name='description'
				id='description'
				placeholder='Enter description'
				minLength={minLenght}
				value={value}
				onChange={onChange}
			></textarea>
		</div>
	);
}
