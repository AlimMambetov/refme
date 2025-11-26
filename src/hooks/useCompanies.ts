// hooks/useCompanies.ts
import { useState, useEffect, useCallback } from 'react';
import companiesData from '&/data/companies.json'

interface Company {
	id: number;
	company: string;
	industry: string;
	countryCode: string;
	description: string;
}

export const useCompanies = () => {
	const [companies, setCompanies] = useState<Company[]>([]);
	const [loading, setLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const [page, setPage] = useState(1);

	const loadCompanies = useCallback(async () => {
		if (loading || !hasMore) return;

		setLoading(true);

		try {
			// Имитируем задержку загрузки
			await new Promise(resolve => setTimeout(resolve, 1000));
			const allCompanies: Company[] = companiesData;

			// Пагинация - берем по 6 компаний за раз
			const itemsPerPage = 6;
			const startIndex = (page - 1) * itemsPerPage;
			const endIndex = startIndex + itemsPerPage;
			const newCompanies = allCompanies.slice(startIndex, endIndex);

			setCompanies(prev => [...prev, ...newCompanies]);
			setHasMore(endIndex < allCompanies.length);
			setPage(prev => prev + 1);
		} catch (error) {
			console.error('Error loading companies:', error);
		} finally {
			setLoading(false);
		}
	}, [loading, hasMore, page]);

	// Функция для ручной загрузки (при клике на кнопку)
	const loadMore = () => {
		loadCompanies();
	};

	// Загружаем первые компании при монтировании
	useEffect(() => {
		loadCompanies();
	}, []);

	return { companies, loading, hasMore, loadMore };
};