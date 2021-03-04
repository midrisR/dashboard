//  eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
	switch (action.type) {
		case 'RESET':
			return {
				...state,
				form: action.payload,
			};
		case 'HANDLE_INPUT':
			return {
				...state,
				form: {
					...state.form,
					[action.fromType]: action.value,
				},
			};
		case 'GET_TOKO':
			return {
				...state,
				loading: false,
				toko: action.payload,
				pageCount: action.pageCount,
				perPage: action.perPage,
				currentPage: action.currentPage,
			};
		case 'SHOP':
			return {
				...state,
				shops: action.payload,
			};
		case 'POST':
			return {
				...state,
				loading: false,
				success: true,
			};
		case 'PAGINATION':
			return {
				...state,
				loading: false,
				toko: action.payload,
				pageCount: action.pageCount,
				perPage: action.perPage,
				currentPage: action.currentPage,
			};
		case 'SEARCH':
			return {
				...state,
				loading: false,
				toko: action.payload,
				pageCount: action.pageCount,
				perPage: action.perPage,
			};
		case 'PROVINSI':
			return {
				...state,
				provinsi: action.payload,
			};
		case 'KABUPATEN':
			return {
				...state,
				kota: action.payload,
				form: {
					...state.form,
					kabupaten: action.value,
				},
			};
		case 'KECAMATAN':
			return {
				...state,
				kcmtn: action.payload,
				form: {
					...state.form,
					kecamatan: action.value,
				},
			};
		case 'KELURAHAN':
			return {
				...state,
				klrhn: action.payload,
				form: {
					...state.form,
					kelurahan: action.value,
				},
			};

		case 'ERROR':
			return {
				...state,
				loading: false,
				success: false,
				error: action.payload,
			};
		default:
			return state;
	}
};
