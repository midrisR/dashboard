import React, { useState } from 'react';
import Pagination from '../pagination';
import { useQuery } from 'react-query';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

async function fetchPagination(page, key) {
	const { data } = await axios.get(
		`http://localhost:5000/seller?page=${page}&search=${key}`,
	);
	return data;
}

const Tables = () => {
	const history = useHistory();
	const [key, setKey] = useState('');
	const [currentPage, setCurrentPage] = useState(1);

	const { data, isLoading, isSuccess } = useQuery(
		['data', currentPage, key],
		() => fetchPagination(currentPage, key),
		{ keepPreviousData: true },
	);

	const handlePagination = (page) => {
		setCurrentPage(page);
	};

	if (isLoading)
		return (
			<h1 className='text-white text-2xl text-center font-semibold'>loading</h1>
		);
	return (
		<div className='py-2 overflow-x-auto mt-5'>
			<button
				className='bg-soft-dark text-white px-4 py-3 rounded-lg focus:outline-none shadow-xl mb-4'
				onClick={() => history.push('/costumers/create')}
			>
				Add Costumer
			</button>
			<div className='align-middle rounded-xl  inline-block w-full py-4 overflow-auto bg-dark shadow-xl px-12'>
				<div className='flex justify-end items-center'>
					<div className='inline-flex rounded-xl w-1/3 shadow-xl px-2 lg:px-6 h-12 bg-soft-dark'>
						<div className='flex flex-wrap items-stretch w-full h-full mb-6 relative'>
							<div className='flex items-center'>
								<i className='fas fa-search text-xl opacity-20 text-gray-300' />
							</div>
							<input
								type='text'
								className='bg-transparent flex-shrink flex-grow flex-auto leading-normal tracking-wide w-px flex-1 px-3 relative focus:outline-none text-base text-gray-500 placeholder-gray-300 placeholder-opacity-50'
								placeholder='Search'
								onChange={(e) => setKey(e.target.value)}
							/>
						</div>
					</div>
				</div>
				<div className='align-middle inline-block min-w-full overflow-hidden shadow-dashboard px-2 pt-3 rounded-bl-lg rounded-br-lg'>
					<table className='min-w-full'>
						<thead className='border-b-2 border-gray-300 border-opacity-40'>
							<tr>
								<th className='px-6 py-3 text-left leading-4 text-gray-300'>
									#
								</th>
								<th className='px-6 py-3 text-left text-sm leading-4 text-gray-300'>
									Pemilik
								</th>
								<th className='px-6 py-3 text-left text-sm leading-4 text-gray-300'>
									Toko
								</th>
								<th className='px-6 py-3 text-left text-sm leading-4 text-gray-300'>
									Status
								</th>
							</tr>
						</thead>
						<tbody className='border-b border-gray-500 border-opacity-400'>
							<>
								{isSuccess &&
									data.data.map((val, i) => {
										let index = i;
										return (
											<tr key={i}>
												<td className='px-6 py-4 whitespace-no-wrap'>
													<div className='flex items-center'>
														<div>
															<div className='text-sm leading-5 text-gray-300'>
																{(currentPage - 1) * data.PerPage + ++index}
															</div>
														</div>
													</div>
												</td>
												<td className='px-6 py-4 whitespace-no-wrap text-gray-300 text-sm leading-5'>
													{val.pemilik}
												</td>
												<td className='px-6 py-4 whitespace-no-wrap text-gray-300 text-sm leading-5'>
													{val.toko}
												</td>
												<td className='px-6 py-4 whitespace-no-wrap text-gray-300 text-sm leading-5'>
													{val.status}
												</td>
												<td className='px-6 py-4 whitespace-no-wrap text-gray-300 text-sm leading-5'>
													<button
														className='px-4 py-2 bg-blue-500 text-white focus:outline-none rounded shadow-xl'
														onClick={() =>
															history.push(`/costumers/view/${val._id}`)
														}
													>
														view
													</button>
												</td>
											</tr>
										);
									})}
							</>
						</tbody>
					</table>
					<div className='flex-1 flex items-center justify-between mt-4 work-sans mb-6'>
						<p className='text-sm leading-5 text-gray-300'>
							Showing
							<span className='font-medium mx-1'>{currentPage}</span>
							to
							<span className='font-medium mx-1'>{data.perPage}</span>
							of
							<span className='font-medium mx-1'>{data.total}</span>
							results
						</p>
						<Pagination
							pageCount={data.total}
							perPage={data.PerPage}
							currentPage={currentPage}
							handlePagination={handlePagination}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default React.memo(Tables);
