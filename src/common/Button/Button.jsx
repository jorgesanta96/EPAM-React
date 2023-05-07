import React from 'react';

import './button.css';

function Button(props) {
	const { buttonText, onClick, buttonType } = props;
	return (
		<button className='button' type={buttonType} onClick={onClick}>
			{buttonText}
		</button>
	);
}

export default Button;
