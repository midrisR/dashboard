import React from 'react';
import Paginated from 'react-js-pagination';

const Pagination = ({ pageCount, perPage, currentPage, handlePagination }) => {
	return (
		<Paginated
			activePage={currentPage}
			itemsCountPerPage={perPage}
			totalItemsCount={pageCount}
			onChange={handlePagination}
			innerClass='flex bg-dark items-center font-semibold text-gray-300'
			itemClass='px-4 py-2'
			hideDisabled
			activeClass='rounded-xl bg-full-dark text-blue-500 shadow-xl'
			itemClassFirst='rounded-l-xl'
			itemClassLast='rounded-r-xl'
			disabledClass='cursor-not-allowed'
		/>
	);
};

export default React.memo(Pagination);
