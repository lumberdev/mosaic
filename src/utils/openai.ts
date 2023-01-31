import axios from 'axios';

export const openai = axios.create({
	baseURL: 'https://api.openai.com/v1/completions',
	headers: {
		'Content-Type': 'application/json',
		Authorization: 'Bearer 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'
	}
});
