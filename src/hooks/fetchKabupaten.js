import { useQuery } from 'react-query';
import axios from 'axios';

const getKabupaten = async (kabId) => {
	const { data } = await axios
		.get(
			`https://api-provinsi-indonesia.herokuapp.com/kabupaten?id_kabupaten=${kabId}`,
		)
		.then((res) => res);
	return data;
};

export default function useKabupaten(kabId) {
	return useQuery(['kabupaten', kabId], () => getKabupaten(kabId), {
		enabled: !!kabId,
	});
}
