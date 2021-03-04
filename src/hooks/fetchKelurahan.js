import { useQuery } from 'react-query';
import axios from 'axios';

const getKelurahanById = async (kecId) => {
	const { data } = await axios.get(
		`https://api-provinsi-indonesia.herokuapp.com/kelurahan?id_kelurahan=${kecId}`,
	);
	return data;
};

export default function useKelurahan(kecId) {
	return useQuery(['Kelurahan', kecId], () => getKelurahanById(kecId), {
		enabled: !!kecId,
	});
}
