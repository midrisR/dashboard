import React from 'react';
import Dropdown from './dropdown';
import useProvinsi from '../../hooks/fetchProvinsi';
import useKabupaten from '../../hooks/fetchKabupaten';
import useKecamatan from '../../hooks/fetchKecamatan';
import useKelurahan from '../../hooks/fetchKelurahan';

const InputSelect = ({ error = [] }) => {
	const [id, setId] = React.useState('');
	const [show, setShow] = React.useState(false);
	const [visible, setVisible] = React.useState(false);
	const [value, setValue] = React.useState([]);
	const [name] = React.useState([
		'provinsi',
		'kabupaten',
		'kecamatan',
		'kelurahan',
	]);
	const provinsi = useProvinsi();
	const kabupaten = useKabupaten(id.provinsi);
	const kecamatan = useKecamatan(id.kabupaten);
	const kelurahan = useKelurahan(id.kecamatan);
	const myRef = React.useRef([]);

	name.map((va, i) => (myRef.current[i] = React.createRef()));

	const handleClick = (id) => {
		setShow((old) => ({
			[id]: !old[id],
		}));
	};

	const compare = (data, k) => {
		return value[k] === data;
	};

	const SelectId = (data, id, i, n) => {
		if (i === 'provinsi') {
			if (!compare(data, 'provinsi')) {
				setValue([]);
			}
		} else {
			if (!compare(data, 'kabupaten')) {
				setValue([]);
			}
		}

		setValue((state) => ({
			...state,
			[i]: data,
		}));

		setId((old) => ({
			...old,
			[i]: id,
		}));

		if (!n) setVisible((state) => !state);

		setShow((old) => ({
			[n]: !old[n],
		}));
	};

	console.log(value);
	const handleShow = () => {
		setVisible((state) => !state);
		setShow((old) => ({
			0: !old[0],
		}));
	};

	return (
		<div>
			<p className='font-bold capitalize text-semibold text-base text-gray-300'>
				Pilih Porvinsi/kota/kecamatan/kelurahan
			</p>
			<div className='relative flex w-full items-center'>
				<div
					className={`relative bg-soft-dark text-gray-300 shadow-mds appearance-none block w-full rounded-xl py-3 px-4`}
					onClick={handleShow}
				>
					{value ? (
						<>
							<span className='mr-2'>{value.provinsi}</span>
							<span className='mr-2'>{value.kabupaten}</span>
							<span className='mr-2'>{value.kecamatan}</span>
							<span className='mr-2'>{value.kelurahan}</span>
						</>
					) : (
						'Pilih Provinsi'
					)}
					{/* pilih */}
				</div>
				<span className='z-10 h-full leading-snug font-normal absolute text-center text-gray-400 absolute bg-transparent rounded text-base items-center justify-center right-0 pr-3 py-3'>
					<i className='fas fa-sort-down' />
				</span>
			</div>
			<div
				className={
					visible ? 'block bg-soft-dark px-5 py-3 rounded-xl mt-2' : 'hidden'
				}
			>
				<ul className='flex text-center justify-between w-full mt-2 bg-soft-dark px-5 py-3'>
					{name.map((nm, i) => (
						<li
							ref={myRef.current[i]}
							key={i}
							className='w-3/6 font-semibold p-2'
							onClick={() => handleClick(i)}
						>
							<button
								className={
									`bg-green-200 p-2 rounded font-semibold ` +
									(show[i] ? 'text-green-900' : 'text-green-500')
								}
							>
								{nm}
							</button>
						</li>
					))}
				</ul>
				<ul className={show[0] ? 'overflow-y-auto block' : 'hidden'}>
					{provinsi.isSuccess ? (
						provinsi.data.map((prov, i) => (
							<li
								className='inline-block px-3 py-2 text-gray-300 cursor-pointer'
								key={i}
								onClick={() => SelectId(prov.name, prov.id, 'provinsi', 1)}
							>
								{prov.name}
							</li>
						))
					) : (
						<h1 className='text-gray-300 text-2xl text-center font-semibold'>
							Loading
						</h1>
					)}
				</ul>
				<ul className={show[1] ? 'overflow-y-auto block' : 'hidden'}>
					{kabupaten.isSuccess ? (
						kabupaten.data.map((kab, i) => (
							<li
								className='inline-block px-3 py-2 text-gray-300 cursor-pointer'
								key={i}
								onClick={() => SelectId(kab.name, kab.id, 'kabupaten', 2)}
							>
								{kab.name}
							</li>
						))
					) : (
						<h1 className='text-gray-300 text-2xl text-center font-semibold'>
							Loading
						</h1>
					)}
				</ul>
				<ul className={show[2] ? 'overflow-y-auto block' : 'hidden'}>
					{kecamatan.isSuccess ? (
						kecamatan.data.map((kec, i) => (
							<li
								className='inline-block px-3 py-2 text-gray-300 cursor-pointer'
								key={i}
								onClick={() => SelectId(kec.name, kec.id, 'kecamatan', 3)}
							>
								{kec.name}
							</li>
						))
					) : (
						<h1 className='text-gray-300 text-2xl text-center font-semibold'>
							Loading
						</h1>
					)}
				</ul>
				<ul className={show[3] ? 'overflow-y-auto block' : 'hidden'}>
					{kelurahan.isSuccess ? (
						kelurahan.data.map((kel, i) => (
							<li
								className='inline-block px-3 py-2 text-gray-300 cursor-pointer '
								key={i}
								onClick={() => SelectId(kel.name, kel.id, 'kelurahan')}
							>
								{kel.name}
							</li>
						))
					) : (
						<h1 className='text-gray-300 text-2xl text-center font-semibold'>
							Loading
						</h1>
					)}
				</ul>
			</div>

			{/* <Dropdown
				name='provinsi'
				error={error}
				data={provinsi.isSuccess && provinsi.data}
				setId={setId}
				isSuccess={provinsi.isSuccess}
				handleClick={() => handleClick(0)}
				setShow={setShow}
				show={show[0]}
			/>
			<Dropdown
				name='kabupaten'
				error={error}
				data={kabupaten.isSuccess && kabupaten.data}
				setId={setId}
				isSuccess={kabupaten.isSuccess}
				handleClick={() => handleClick(1)}
				setShow={setShow}
				show={show[1]}
			/>
			<Dropdown
				name='kecamatan'
				error={error}
				data={kecamatan.isSuccess && kecamatan.data}
				setId={setId}
				isSuccess={kecamatan.isSuccess}
				handleClick={() => handleClick(2)}
				setShow={setShow}
				show={show[2]}
			/>
			<Dropdown
				name='kelurahan'
				error={error}
				data={kelurahan.isSuccess && kelurahan.data}
				setId={setId}
				isSuccess={kelurahan.isSuccess}
				handleClick={() => handleClick(3)}
				setShow={setShow}
				show={show[3]}
			/> */}
		</div>
	);
};

export default InputSelect;
