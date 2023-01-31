import axios from 'axios';

export const airtable = axios.create({
	baseURL: 'https://api.airtable.com/v0/appYL0R3gD38Dcjzr/AI%20Tools',
	headers: {
		Authorization:
			'Bearer patOOweXf5U89TKrX.00cce371a149cf26f71940681cc45075ef678bf44569484e863ba4808c6aca86'
	}
});
