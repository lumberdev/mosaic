type Sanitizer = '-' | '_' | '';

export const sanitizeString = (str: string, sanitizer: Sanitizer = '') =>
	str.replace(/[^a-zA-Z0-9]/g, sanitizer).replace(/https|www/g, '');
