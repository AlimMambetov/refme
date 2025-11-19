'use client'
import React, { useState } from 'react';
import cls from './style.module.scss';
import clsx from 'clsx';
import { useIsDesktop } from '@/hooks';
import { InputText, Select, Title } from '@/components/ui';

export const SearchBlock = ({ title = 'All links' }: any) => {
	const [searchText, SET_searchText] = useState('');
	const isDesktop = useIsDesktop();

	const arr = [{ label: 'item-1-asdasdas asd asd asdddgrew dasd asd', value: '1' }, { label: 'item-2', value: '2' }, { label: 'item-3', value: '3' }];


	return (<>
		<div data-desktop={isDesktop} className={cls.search}>
			<Title className={cls.search__title} level={2}>{title}</Title>
			<InputText isRecent advice={["apple", "pineapple", "applesauce", "orange", "banana"]} popular={['BMV', 'Scorpion', 'Sub-Zero']} value={searchText} setter={SET_searchText} type='search' showValidation={false} className={cls.search__inp} w='100%' placeholder='Company, service, or keywords' />
			<Select title={'Categories'} className={clsx(cls.search__select, cls.categories)} isMulti options={arr} />
		</div>
	</>)
}

export default SearchBlock;