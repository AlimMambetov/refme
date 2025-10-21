export const fetchDataPOST = (body?: any) => ({
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
	},
	body: JSON.stringify(body || {})
});



export function parseTokenExpiry(expiryString: string): Date {
	const value = parseInt(expiryString);

	if (expiryString.endsWith('m')) {
		// Минуты
		const date = new Date();
		date.setTime(date.getTime() + value * 60 * 1000);
		return date;
	} else if (expiryString.endsWith('h')) {
		// Часы
		const date = new Date();
		date.setTime(date.getTime() + value * 60 * 60 * 1000);
		return date;
	} else if (expiryString.endsWith('d')) {
		// Дни
		const date = new Date();
		date.setTime(date.getTime() + value * 24 * 60 * 60 * 1000);
		return date;
	}

	throw new Error('Invalid expiry format');
}