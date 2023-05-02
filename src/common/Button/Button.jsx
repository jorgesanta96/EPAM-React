import React from 'react';

import './button.css';

function Button(props) {
	const { buttonText, onClick } = props;
	return (
		<button className='button' onClick={onClick}>
			{buttonText}
		</button>
	);
}

export default Button;
