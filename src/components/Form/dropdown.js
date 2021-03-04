import React, { useState, useContext } from 'react';
import DropdownList from './dropdown-list';
import { GlobalContext } from '../../context/GlobalState';

const Dropdown = ({
	name,
	error,
	data,
	setId,
	isSuccess,
	show,
	handleClick,
	setShow,
}) => {
	const { form } = useContext(GlobalContext);

	const [value, setValue] = useState(`pilih ${name}`);

	function getFieldError(field) {
		return !!error[field];
	}

	function getMessageError(field) {
		return (
			<>
				{getFieldError(field) ? (
					<small className='text-sm text-red-500 italic'>
						{error[field][0]}{' '}
					</small>
				) : null}
			</>
		);
	}

	return (
		<>
			<div className='lg:flex items-center mb-6'>
				<label
					htmlFor={name}
					className='lg:w-1/6 font-bold capitalize text-semibold text-base text-gray-300'
				>
					{name}
				</label>
				<div className='lg:w-2/6 mt-2'>
					<div
						className='relative flex w-full items-center'
						onClick={handleClick}
					>
						<div
							className={`relative bg-soft-dark text-gray-300 shadow-mds appearance-none block w-full rounded-xl py-3 px-4
              ${getFieldError(name) && 'border border-red-500'}`}
						>
							{form[name] ? form[name] : value}
						</div>
						<span className='z-10 h-full leading-snug font-normal absolute text-center text-gray-400 absolute bg-transparent rounded text-base items-center justify-center right-0 pr-3 py-3'>
							<i className='fas fa-sort-down' />
						</span>
					</div>
					{getMessageError(name)}
					<DropdownList
						name={name}
						show={show}
						setShow={setShow}
						data={data}
						setValue={setValue}
						isSuccess={isSuccess}
						setId={setId}
					/>
				</div>
			</div>
		</>
	);
};

export default Dropdown;
