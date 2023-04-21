import axios from 'axios';
import { env } from '$env/dynamic/public';

export const DANGEROUSLY_PUBLIC_openai = axios.create({
	baseURL: 'https://api.openai.com/v1/chat/completions',
	headers: {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${env.PUBLIC_OPENAI_API_KEY}`,
	},
});
