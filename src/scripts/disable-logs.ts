export function disableDevLogs() {
	if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
		// Сохраняем оригинальные методы
		const original = {
			log: console.log,
			info: console.info,
			debug: console.debug,
			warn: console.warn
		};

		// Регулярки для блокировки
		const blockedPatterns = [
			/forward-logs-shared/,
			/\[Fast Refresh\]/,
			/\[HMR\]/,
			/Document already loaded/,
			/Attempting to initialize/,
			/AdUnit initialized/,
			/content-script\.js/,
			/running initialization/
		];

		const shouldBlock = (message: string) => {
			return blockedPatterns.some(pattern => pattern.test(message));
		};

		// Простое преобразование без JSON.stringify для сложных объектов
		const methods = ['log', 'info', 'debug', 'warn'] as const;

		methods.forEach(method => {
			console[method] = (...args: any[]) => {
				// Пытаемся получить строку без JSON.stringify
				let message = '';
				try {
					message = args.map(arg => {
						if (typeof arg === 'string') return arg;
						if (typeof arg === 'object' && arg !== null) {
							// Проверяем на DOM элементы
							if (arg instanceof Element || arg instanceof Node) {
								return `[DOM Element]`;
							}
							// Пробуем преобразовать объект
							try {
								return JSON.stringify(arg);
							} catch {
								return `[Object ${arg.constructor?.name || 'unknown'}]`;
							}
						}
						return String(arg);
					}).join(' ');
				} catch {
					message = args.map(arg => String(arg)).join(' ');
				}

				if (!shouldBlock(message)) {
					original[method].apply(console, args);
				}
			};
		});

		console.log('🚀 Dev logs filter activated - unwanted messages are hidden');
	}
}