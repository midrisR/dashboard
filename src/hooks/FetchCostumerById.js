import { useQuery } from 'react-query';
import axios from 'axios';

const GetCostumer = async (id) => {
	const { data } = await axios.get(`http://localhost:5000/seller/${id}`);
	return data;
};

export default function useCostumerById(id) {
	return useQuery(['costumerID', id], () => GetCostumer(id));
}
