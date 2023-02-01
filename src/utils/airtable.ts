import axios from 'axios';

export const airtable = axios.create({
	baseURL: 'https://api.airtable.com/v0/appYL0R3gD38Dcjzr/AI%20Tools',
	headers: {
		Authorization: `Bearer ${process.env.AIRTABLE_ACCESS_TOKEN}`
	}
});
