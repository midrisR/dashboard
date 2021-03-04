import React, { useContext, useState } from 'react';
import { GlobalContext } from '../../context/GlobalState';

function InputStatus({ name, error }) {
	const { handleInput, form } = useContext(GlobalContext);
	const [show, setShow] = useState(false);
	function getFieldError(field) {
		return !!error[field];
	}

	function getMessageError(field) {
		return (
			<>
				{getFieldError(field) ? (
					<small className='text-sm text-red-500 italic'>
						{error[field][0]}
					</small>
				) : null}
			</>
		);
	}
	const handleClick = (data) => {
		handleInput('status', data);
		setShow((prevState) => !prevState);
	};
	return (
		<div className='lg:flex items-center mb-6'>
			<label
				htmlFor={name}
				className='lg:w-1/6 font-bold capitalize text-semibold text-base text-gray-300'
			>
				{name}
			</label>
			<div className='lg:w-2/6'>
				<div
					className={`flex cursor-pointer justify-between shadow-xl items-center h-12 bg-soft-dark text-gray-300 appearance-none block w-full rounded-xl py-3 px-4 focus:outline-none mt-2 ${
						getFieldError(name) && 'border border-red-500'
					}`}
					onClick={() => setShow(!show)}
				>
					<span>{form.status || 'select'}</span>
					<i className='fas fa-chevron-down' />
				</div>
				{getMessageError(name)}
				<div className='relative'>
					<ul
						role='listbox'
						tabIndex='-1'
						arialabelledby='listbox-label'
						aria-activedescendant='listbox-item-2'
						className={`absolute z-20 max-h-60 overflow-y-auto bg-soft-dark text-gray-300 shadow-xl px-4 py-2 mt-2 rounded-xl w-full focus:outline-none 
        ${show ? 'block' : 'hidden'}`}
					>
						<li
							role='option'
							aria-selected={true}
							className='px-4 py-2 text-white cursor-pointer'
							aria-hidden='true'
							onClick={() => handleClick('acceptep')}
						>
							Acceptep
						</li>
						<li
							role='option'
							aria-selected={true}
							className='px-4 py-2 text-white cursor-pointer'
							aria-hidden='true'
							onClick={() => handleClick('rejected')}
						>
							Rejected
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}

export default InputStatus;
