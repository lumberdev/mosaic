import axios from 'axios';
import { env } from '$env/dynamic/private';

export const airtable = axios.create({
	baseURL: 'https://api.airtable.com/v0/appYL0R3gD38Dcjzr/AI%20Tools',
	headers: {
		Authorization: `Bearer ${env.AIRTABLE_ACCESS_TOKEN}`
	}
});
