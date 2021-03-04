import { useQuery } from 'react-query';
import axios from 'axios';

const getKecamatanById = async (kecId) => {
	const { data } = await axios
		.get(
			`https://api-provinsi-indonesia.herokuapp.com/kecamatan?id_kecamatan=${kecId}`,
		)
		.then((res) => res);
	return data;
};

export default function useKecamatan(kecId) {
	return useQuery(['kecamatan', kecId], () => getKecamatanById(kecId), {
		enabled: !!kecId,
	});
}
