import { useQuery } from 'react-query';
import axios from 'axios';

const getCostumers = async () => {
	const { data } = await axios.get('http://localhost:5000/peoples/');
	return data;
};

export default function useCostumers() {
	return useQuery('Costumers', getCostumers);
}
