import React from 'react';

const Button = ({ onClick }) => {
	console.log('child render');
	return (
		<button className='px-3 py-4 bg-blue-500 text-white focus:outline-none' onClick={onClick}>
			CLick me
		</button>
	);
};

export default React.memo(Button);
