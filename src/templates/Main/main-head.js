import React from 'react';

const MainHead = () => (
	<>
		<div className='flex justify-end w-full pr-4 mt-5'>
			<div className='w-full lg:w-1/3 relative flex flex-wrap ml-6 justify-end mt-5 mb-10 mb-3'>
				<input
					type='text'
					placeholder='Search'
					className='px-3 py-3 relative text-base rounded-xl text-sm shadow focus:outline-none  w-full pr-10 placeholder-gray-500 placeholder-opacity-50 bg-dark text-gray-300'
				/>
				<span className='z-10 h-full leading-snug font-normal absolute text-center text-gray-400 absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3'>
					<i className='fas fa-search' />
				</span>
			</div>
		</div>
	</>
);

export default MainHead;
