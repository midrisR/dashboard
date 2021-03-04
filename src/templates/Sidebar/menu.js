import React from 'react';

const Menus = [
	{
		name: 'Dashboard',
		path: '/',
		icon: <i className='fas fa-home mx-0 lg:mx-4' />,
	},
	{
		name: 'Costumers',
		path: '/costumers',
		icon: <i className='fas fa-users mx-0 lg:mx-4' />,
	},
	{
		name: 'Categories',
		path: '/categories',
		icon: <i className='fas fa-list mx-0 lg:mx-4' />,
	},
	{
		name: 'Transactions',
		path: '/transactions',
		icon: <i className='fas fa-cash-register mx-0 lg:mx-4' />,
	},
];

export default Menus;
