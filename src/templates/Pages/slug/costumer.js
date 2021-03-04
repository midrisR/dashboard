import { useParams } from 'react-router-dom';
import useCostumerById from '../../../hooks/FetchCostumerById';
import CostumerEdit from './CostumerEdit';
const CostumerById = () => {
	const param = useParams();
	const { data, isLoading, isSuccess } = useCostumerById(param.id);
	if (isLoading)
		return (
			<h1 className='text-white text-center text-4xl font-bold'>Loading</h1>
		);

	return (
		<div>
			{isSuccess ? (
				<>
					<div className='flex flex-wrap'>
						<div className='w-1/2 lg:w-2/6 mb-5'>
							<img
								src={`http://localhost:5000/upload/${data.foto_pemilik[0]}`}
								alt={data.toko}
							/>
						</div>
						<div className='w-full lg:w-4/6 text-white text-base lg:pl-5'>
							<div className='flex flex-wrap mb-4'>
								<div className='w-1/6 flex justify-between mr-4 lg:mr-2'>
									<p>Pemilik</p>
									<span>:</span>
								</div>
								<div className='w-4/6'>{data.pemilik}</div>
							</div>
							<div className='flex flex-wrap mb-4'>
								<div className='w-1/6 flex justify-between mr-4 lg:mr-2'>
									<p>Toko</p>
									<span>:</span>
								</div>
								<div className='w-4/6'>{data.toko}</div>
							</div>
							<div className='flex flex-wrap mb-4'>
								<div className='w-1/6 flex justify-between mr-4 lg:mr-2'>
									<p>Alamat</p>
									<span>:</span>
								</div>
								<div className='w-4/6'>{data.alamat}</div>
							</div>
							<div className='flex flex-wrap'>
								<div className='w-1/6 flex justify-between mr-4 lg:mr-2 mb-4'>
									<p>kelurahan</p>
									<span>:</span>
								</div>
								<div className='w-4/6 mb-4'>{data.kelurahan}</div>
								<div className='w-1/6 flex justify-between mr-4 lg:mr-2 mb-4'>
									<p>Kecamatan</p>
									<span>:</span>
								</div>
								<div className='w-4/6'>{data.kecamatan}</div>
							</div>
							<div className='flex flex-wrap mb-4'>
								<div className='w-1/6 flex justify-between mr-4 lg:mr-2'>
									<p>Provinsi</p>
									<span>:</span>
								</div>
								<div className='w-4/6'>
									{data.kabupaten}, {data.provinsi} {data.kode_pos}
								</div>
							</div>
							<div className='flex flex-wrap mb-4'>
								<div className='w-1/6 flex justify-between mr-4 lg:mr-2 mb-4'>
									<p>Status</p>
									<span>:</span>
								</div>
								<div
									className={`w-1/2 lg:w-4/6 text-semibold ${
										data.status === 'acceptep'
											? 'text-green-500'
											: 'text-red-400'
									}`}
								>
									{data.status}
								</div>
							</div>
						</div>
					</div>
					<CostumerEdit data={data} isSuccess={isSuccess} />
				</>
			) : null}
		</div>
	);
};

export default CostumerById;
