import React, { createContext, useReducer } from 'react';
import axios from 'axios';
import AppReducer from './AppReducer';

const initialState = {
	form: {
		pemilik: '',
		toko: '',
		alamat: '',
		provinsi: '',
		kabupaten: '',
		kecamatan: '',
		kelurahan: '',
		kode_pos: '',
		telepon: '',
		foto_pemilik: [],
		foto_toko: [],
		status: '',
	},
};

// create context
export const GlobalContext = createContext(initialState);
// provider component
export const GlobalProvider = ({ children }) => {
	const [state, dispatch] = useReducer(AppReducer, initialState);
	const [images, setImages] = React.useState([]);
	const clearState = () => {
		dispatch({
			type: 'RESET',
			payload: initialState.form,
		});
	};

	// handle input
	const handleInput = (fromType, value) => {
		dispatch({
			type: 'HANDLE_INPUT',
			fromType,
			value,
		});
	};

	const handlePost = async (formData) => {
		try {
			const res = await axios.post('http://localhost:5000/seller', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
			dispatch({
				type: 'POST',
			});
			if (res.status === 201) {
				clearState();
			}
		} catch (error) {
			dispatch({
				type: 'ERROR',
				payload: error.response.data.error,
			});
		}
	};

	return (
		<GlobalContext.Provider
			value={{
				form: state.form,
				clearState,
				handlePost,
				handleInput,
				images,
				setImages,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};
