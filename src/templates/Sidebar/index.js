import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Menus from './menu';

const Sidebar = () => {
	const router = useLocation();
	const path = router.pathname.split('/');
	return (
		<div className='w-1/6 p-4 __sidebar overflow-x-hidden'>
			<div className='relative flex justify-center lg:justify-between items-center text-3xl text-center font-black mt-5 mb-20'>
				<div className='h-12 w-12 bg-gray-400 opacity-40 rounded-lg' />
				<h1 className='hidden lg:block text-gray-300'> Company</h1>
			</div>
			{/* Menu */}
			<ul className=' text-opacity-70 md:min-w-full list-none'>
				{Menus.map((val, i) => {
					const pathName = val.path.split('/');
					return (
						<li
							key={i}
							className={
								`relative transform transition duration-500 ease-in-out hover:text-pink rounded-lg hover:rounded-lg list-li py-3 mb-3 cursor-pointer ` +
								(path[1] === pathName[1]
									? 'bg-gradient-to-r from-blue-500 rounded-lg text-white translate-x-6'
									: 'text-gray-400')
							}
						>
							<Link
								className='flex items-center justify-center lg:justify-start'
								to={val.path}
							>
								{val.icon}
								<span className='hidden lg:block'>{val.name}</span>
							</Link>
						</li>
					);
				})}
			</ul>
			{/* END MENU */}
		</div>
	);
};

export default Sidebar;
