'use client'
import React, { useEffect, useState } from 'react';
import cls from './style.module.scss';
import { useIsDesktop, useCompanies } from '@/hooks';
import clsx from 'clsx';
import { LinkCard, SearchBlock, SortBlock, TopCompanies } from '@/components/common';
import { Button, Icon } from '@/components/ui';
import { v4 as setId } from 'uuid'


const Search = () => {
	return (
		<div className={cls.search}>
			<SearchBlock />
			<SortBlock />
		</div>
	);
}

export const SearchLinkBlock = (props: any) => {
	const isDesktop = useIsDesktop();
	const { companies, loading, hasMore, loadMore } = useCompanies();

	// Обработчик бесконечного скролла
	useEffect(() => {
		const handleScroll = () => {
			if (loading || !hasMore) return;

			// Проверяем, доскроллили ли до конца
			const scrollTop = window.scrollY;
			const windowHeight = window.innerHeight;
			const documentHeight = document.documentElement.scrollHeight;

			// Загружаем следующую страницу когда осталось 300px до конца
			if (scrollTop + windowHeight >= documentHeight - 300) {
				loadMore();
			}
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [loading, hasMore, loadMore]);

	return (
		<div data-desktop={isDesktop} className={`${cls.wrap} container`}>
			{!isDesktop && <TopCompanies device="phone" />}
			<Search />

			{
				isDesktop && (
					<div className={cls.top}>
						<div className={cls.top__pin}>
							<TopCompanies />
							<Button w='100%' variant='accent'>
								Post referral link <Icon name='plus' />
							</Button>
						</div>
					</div>
				)
			}

			<div className={cls.cards}>
				{/* Рендерим загруженные компании */}
				{companies.map((company: any) => (
					<LinkCard
						key={`${setId()}_${company.id}`}
						{...company}// передаем данные компании в LinkCard
					/>
				))}

				{/* Кнопка для ручной загрузки (опционально) */}
				{hasMore && (
					<Button
						size={isDesktop ? 'big' : 'middle'}
						variant='secondary'
						onClick={loadMore}
						disabled={loading}
					>
						{loading ? 'Loading...' : 'Show more'}
					</Button>
				)}

				{/* Индикатор загрузки при автоматическом скролле */}
				{loading && (
					<div className={cls.loading}>
						Loading more companies...
					</div>
				)}
			</div>
		</div>
	);
}

export default SearchLinkBlock;