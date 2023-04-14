import axios from 'axios';
import { env } from '$env/dynamic/private';

export const openai = axios.create({
	baseURL: 'https://api.openai.com/v1/completions',
	headers: {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${env.OPENAI_API_KEY}`
	}
});
