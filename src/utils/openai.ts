import axios from 'axios';

export const openai = axios.create({
	baseURL: 'https://api.openai.com/v1/completions',
	headers: {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
	}
});
