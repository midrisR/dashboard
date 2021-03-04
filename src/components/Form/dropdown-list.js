import React, { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';

const DropdownList = ({ name, show, data, setId, setShow }) => {
	const { handleInput } = useContext(GlobalContext);

	const handleClick = (key, id) => {
		handleInput(name, key);
		setId((old) => ({
			...old,
			[name]: id,
		}));
		setShow((old) => ({
			[name]: !old[name],
		}));
	};

	return (
		<div className='relative'>
			<ul
				role='listbox'
				tabIndex='-1'
				arialabelledby='listbox-label'
				aria-activedescendant='listbox-item-3'
				className={` z-20 max-h-60 overflow-y-auto bg-soft-dark shadow-sm px-4 mt-2 rounded-md w-full focus:border-2 focus:outline-none text-gray-300
        ${show ? 'block' : 'hidden'}`}
			>
				{data &&
					data.map((dt, i) => (
						<li
							key={i}
							className='px-4 py-2 cursor-pointer'
							aria-hidden='true'
							onClick={() => handleClick(dt.name, dt.id)}
						>
							{dt.name}
						</li>
					))}
			</ul>
		</div>
	);
};
export default DropdownList;
