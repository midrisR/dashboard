import { useQuery } from 'react-query';
import axios from 'axios';

const getProvinsi = async () => {
	const { data } = await axios
		.get('https://api-provinsi-indonesia.herokuapp.com/provinsi')
		.then((res) => res);
	return data;
};

export default function useProvinsi() {
	return useQuery(['Provinsi'], () => getProvinsi());
}
