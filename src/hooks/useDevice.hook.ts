import { useState, useEffect, useMemo } from 'react';

// Типы для устройств
export type DeviceType = 'desktop' | 'laptop' | 'tablet' | 'phone';
export type OrientationType = 'portrait' | 'landscape';

// Интерфейс для возвращаемого объекта
export interface DeviceInfo {
	// Основные типы устройств
	deviceType: DeviceType;
	isPhone: boolean;
	isTablet: boolean;
	isLaptop: boolean;
	isDesktop: boolean;

	// Мобильные устройства
	isMobile: boolean; // phone + tablet
	isMobileOnly: boolean; // только phone

	// Размеры экрана
	width: number;
	height: number;
	aspectRatio: number;

	// Ориентация
	orientation: OrientationType;
	isPortrait: boolean;
	isLandscape: boolean;

	// Брейкпоинты
	breakpoints: {
		isXs: boolean; // < 576px
		isSm: boolean; // ≥ 576px
		isMd: boolean; // ≥ 768px
		isLg: boolean; // ≥ 992px
		isXl: boolean; // ≥ 1200px
		isXxl: boolean; // ≥ 1400px
	};

	// Состояние
	isInitialized: boolean;
}

// Интерфейс для опций
export interface UseDeviceOptions {
	breakpoints?: {
		xs?: number; // 576px
		sm?: number; // 576px
		md?: number; // 768px
		lg?: number; // 992px
		xl?: number; // 1200px
		xxl?: number; // 1400px
		phone?: number;
		tablet?: number;
		laptop?: number;
		desktop?: number;
	};
	debounceDelay?: number;
}

// Стандартные брейкпоинты
const defaultBreakpoints = {
	xs: 576,
	sm: 576,
	md: 768,
	lg: 992,
	xl: 1200,
	xxl: 1400,
	phone: 768,
	tablet: 1024,
	laptop: 1440,
	desktop: 1441,
};

// Debounce функция
const debounce = <T extends (...args: any[]) => any>(
	func: T,
	delay: number
): ((...args: Parameters<T>) => void) => {
	let timeoutId: NodeJS.Timeout;
	return (...args: Parameters<T>) => {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => func.apply(null, args), delay);
	};
};

// Определение типа устройства
const getDeviceType = (width: number, breakpoints: typeof defaultBreakpoints): DeviceType => {
	if (width < breakpoints.phone) return 'phone';
	if (width < breakpoints.tablet) return 'tablet';
	if (width < breakpoints.laptop) return 'laptop';
	return 'desktop';
};

// Определение ориентации
const getOrientation = (width: number, height: number): OrientationType => {
	return width > height ? 'landscape' : 'portrait';
};

export const useDevice = (options: UseDeviceOptions = {}): DeviceInfo => {
	const {
		breakpoints: customBreakpoints = {},
		debounceDelay = 100
	} = options;

	// Мержим брейкпоинты
	const breakpoints = useMemo(() => ({
		...defaultBreakpoints,
		...customBreakpoints,
	}), [
		customBreakpoints.xs,
		customBreakpoints.sm,
		customBreakpoints.md,
		customBreakpoints.lg,
		customBreakpoints.xl,
		customBreakpoints.xxl,
		customBreakpoints.phone,
		customBreakpoints.tablet,
		customBreakpoints.laptop,
		customBreakpoints.desktop,
	]);

	// Состояние для всех данных устройства
	const [deviceState, setDeviceState] = useState<{
		width: number;
		height: number;
		isInitialized: boolean;
	}>({
		width: 0,
		height: 0,
		isInitialized: false,
	});

	// Вычисляемые значения через useMemo для оптимизации
	const deviceInfo = useMemo((): DeviceInfo => {
		const { width, height, isInitialized } = deviceState;

		if (!isInitialized) {
			// Возвращаем значения по умолчанию до инициализации
			return {
				deviceType: 'desktop',
				isPhone: false,
				isTablet: false,
				isLaptop: false,
				isDesktop: true,
				isMobile: false,
				isMobileOnly: false,
				width: 0,
				height: 0,
				aspectRatio: 0,
				orientation: 'landscape',
				isPortrait: false,
				isLandscape: true,
				breakpoints: {
					isXs: false,
					isSm: false,
					isMd: false,
					isLg: false,
					isXl: false,
					isXxl: false,
				},
				isInitialized: false,
			};
		}

		const deviceType = getDeviceType(width, breakpoints);
		const orientation = getOrientation(width, height);
		const aspectRatio = width > 0 && height > 0 ? width / height : 0;

		return {
			deviceType,
			isPhone: deviceType === 'phone',
			isTablet: deviceType === 'tablet',
			isLaptop: deviceType === 'laptop',
			isDesktop: deviceType === 'desktop',
			isMobile: deviceType === 'phone' || deviceType === 'tablet',
			isMobileOnly: deviceType === 'phone',
			width,
			height,
			aspectRatio,
			orientation,
			isPortrait: orientation === 'portrait',
			isLandscape: orientation === 'landscape',
			breakpoints: {
				isXs: width < breakpoints.xs,
				isSm: width >= breakpoints.sm && width < breakpoints.md,
				isMd: width >= breakpoints.md && width < breakpoints.lg,
				isLg: width >= breakpoints.lg && width < breakpoints.xl,
				isXl: width >= breakpoints.xl && width < breakpoints.xxl,
				isXxl: width >= breakpoints.xxl,
			},
			isInitialized: true,
		};
	}, [deviceState, breakpoints]);

	useEffect(() => {
		// Функция обновления размеров
		const updateDimensions = () => {
			setDeviceState({
				width: window.innerWidth,
				height: window.innerHeight,
				isInitialized: true,
			});
		};

		// Debounced версия для resize
		const debouncedUpdate = debounce(updateDimensions, debounceDelay);

		// Первоначальная установка
		updateDimensions();

		// Слушатели событий
		window.addEventListener('resize', debouncedUpdate);
		window.addEventListener('orientationchange', debouncedUpdate);

		return () => {
			window.removeEventListener('resize', debouncedUpdate);
			window.removeEventListener('orientationchange', debouncedUpdate);
		};
	}, [debounceDelay]);

	return deviceInfo;
};

// Оптимизированные версии для конкретных случаев
// (чтобы избежать перерендеров при изменении ненужных данных)

export const useDeviceType = (options?: UseDeviceOptions): DeviceType => {
	const device = useDevice(options);
	return device.deviceType;
};

export const useIsMobile = (options?: UseDeviceOptions): boolean => {
	const device = useDevice(options);
	return device.isMobile;
};

export const useIsDesktop = (options?: UseDeviceOptions): boolean => {
	const device = useDevice(options);
	return device.isDesktop;
};

export const useWindowSize = (options?: UseDeviceOptions): { width: number; height: number } => {
	const device = useDevice(options);
	return { width: device.width, height: device.height };
};

export const useOrientation = (options?: UseDeviceOptions): OrientationType => {
	const device = useDevice(options);
	return device.orientation;
};