import React, { useContext } from 'react';
import { useMutation } from 'react-query';
import { GlobalContext } from '../../context/GlobalState';
import axios from 'axios';
import Input from '../Form/input';
import Upload from '../Form/upload';
import InputSelect from '../Form/inputSelect';
import InputStatus from '../Form/InputOptions';
const CreateCostumers = () => {
	const { form, clearState } = useContext(GlobalContext);

	const mutation = useMutation((newTodo) =>
		axios.post('http://localhost:5000/seller', newTodo),
	);

	const handleClick = async () => {
		const formData = new FormData();
		const key = Object.keys(form.foto_toko);
		const value = Object.values(form.foto_toko);

		formData.append('pemilik', form.pemilik);
		formData.append('toko', form.toko);
		formData.append('telepon', form.telepon);
		formData.append('alamat', form.alamat);
		formData.append('provinsi', form.provinsi);
		formData.append('kabupaten', form.kabupaten);
		formData.append('kecamatan', form.kecamatan);
		formData.append('kelurahan', form.kelurahan);
		formData.append('kode_pos', form.kode_pos);
		formData.append('status', form.status);
		formData.append('foto_pemilik', form.foto_pemilik[0]);
		for (let i = 0; i < key.length; i++) {
			formData.append('foto_toko', value[i]);
		}

		try {
			const res = await mutation.mutateAsync(formData);
			if (res.status === 201) clearState();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='w-full lg:w-1/7 bg-dark shadow-xl rounded-xl px-8 py-6 mb-24 overflow-y-auto'>
			<div className='w-full flex flex-wrap'>
				<Upload
					name='foto_pemilik'
					error={mutation.isError && mutation.error.response.data.error}
					isSuccess={mutation.isSuccess}
				/>
				<Upload
					name='foto_toko'
					error={mutation.isError && mutation.error.response.data.error}
					isSuccess={mutation.isSuccess}
				/>
			</div>
			<Input
				error={mutation.isError && mutation.error.response.data.error}
				name='pemilik'
			/>
			<Input
				error={mutation.isError && mutation.error.response.data.error}
				name='toko'
			/>
			<Input
				error={mutation.isError && mutation.error.response.data.error}
				name='telepon'
			/>
			<Input
				error={mutation.isError && mutation.error.response.data.error}
				name='alamat'
			/>
			<InputSelect
				error={mutation.isError && mutation.error.response.data.error}
			/>
			<Input
				error={mutation.isError && mutation.error.response.data.error}
				name='kode_pos'
			/>
			<InputStatus
				name='status'
				error={mutation.isError && mutation.error.response.data.error}
			/>
			<button
				className={`inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-gray-300 bg-blue-600 hover:bg-blue-500 focus:outline-none transition ease-in-out duration-150 ${
					mutation.isLoading ? 'cursor-not-allowed' : ''
				}`}
				onClick={handleClick}
				disabled={mutation.isLoading ? true : false}
			>
				{mutation.isLoading ? (
					<>
						<svg
							className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
						>
							<circle
								class='opacity-25'
								cx='12'
								cy='12'
								r='10'
								stroke='currentColor'
								strokeWidth='4'
							></circle>
							<path
								className='opacity-75'
								fill='currentColor'
								d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
							></path>
						</svg>
						Processing
					</>
				) : (
					'Create Costumer'
				)}
			</button>
		</div>
	);
};

export default CreateCostumers;
