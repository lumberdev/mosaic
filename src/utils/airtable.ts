import axios from 'axios';
import { env } from '$env/dynamic/private';

export const airtable = axios.create({
	baseURL: 'https://api.airtable.com/v0',
	headers: {
		Authorization: `Bearer ${env.AIRTABLE_ACCESS_TOKEN}`
	}
});
