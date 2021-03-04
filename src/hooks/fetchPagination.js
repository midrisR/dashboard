import axios from 'axios';

async function fetchPagination(page) {
	const { data } = axios.get(`http://localhost:5000/peoples?page=${page}`);
	return data;
}

export default fetchPagination;
