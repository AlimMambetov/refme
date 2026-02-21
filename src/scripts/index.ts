export * from './disable-logs'
import Cookies from 'js-cookie';


export const fetchDataPOST = (body?: any) => ({
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
	},
	body: JSON.stringify(body || {}),
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


export const setTokens = ({ refreshToken = '', accessToken = '' }: any) => {
	const accessExpiry = parseTokenExpiry('15m');
	const refreshExpiry = parseTokenExpiry('30d');
	Cookies.set('access_token', accessToken, {
		expires: accessExpiry, // 1 день
		secure: true,
		sameSite: 'strict'
	});

	Cookies.set('refresh_token', refreshToken, {
		expires: refreshExpiry, // 7 дней
		secure: true,
		sameSite: 'strict'
	});
}



export function createStateUpdater<T extends object>(
	setState: React.Dispatch<React.SetStateAction<T>>
) {
	return (fieldOrObject: keyof T | Partial<T>, value?: T[keyof T]) => {
		if (typeof fieldOrObject === 'string' && value !== undefined) {
			// @ts-ignore - TypeScript не всегда понимает динамические ключи
			setState(prev => ({ ...prev, [fieldOrObject]: value }));
		} else if (typeof fieldOrObject === 'object') {
			setState(prev => ({ ...prev, ...fieldOrObject }));
		}
	};
}