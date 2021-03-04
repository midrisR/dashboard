import React, { useContext } from 'react';

import { GlobalContext } from '../../context/GlobalState';

const Input = ({ name, error = [] }) => {
	const { form, handleInput } = useContext(GlobalContext);

	const label = name.split('_').join(' ');
	function getFieldError(field) {
		return !!error[field];
	}

	function getMessageError(field) {
		return (
			<>
				{getFieldError(field) ? (
					<div className='text-sm text-red-500 italic'>{error[field][0]} </div>
				) : null}
			</>
		);
	}

	return (
		<div className='lg:flex items-center mb-6'>
			<label
				htmlFor={name}
				className='lg:w-1/6 font-bold capitalize text-semibold text-base text-gray-300'
			>
				{label}
			</label>
			<div className='lg:w-2/6'>
				<input
					type='text'
					placeholder={label}
					value={form[name]}
					className={`shadow-md bg-soft-dark text-gray-300 appearance-none block w-full rounded-xl py-3 px-4 placeholder-gray-300 placeholder-opacity-30 focus:outline-none mt-2 
        	${getFieldError(name) && ' border border-red-500'}`}
					onChange={(e) => handleInput(name, e.target.value)}
				/>
				{getMessageError(name)}
			</div>
		</div>
	);
};

export default Input;
