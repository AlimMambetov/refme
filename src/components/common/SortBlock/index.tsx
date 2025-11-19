'use client'
import React from 'react';
import cls from './style.module.scss';
import { useIsDesktop } from '@/hooks';
import { Select, Title } from '@/components/ui';

export const SortBlock = (props: any) => {
	const isDesktop = useIsDesktop();

	const arr = [{ label: 'item-1-asdasdas asd asd asdddgrew dasd asd', value: '1' }, { label: 'item-2', value: '2' }, { label: 'item-3', value: '3' }];



	return (<>
		<div data-desktop={isDesktop} className={cls.sort}>
			<Title style={{ whiteSpace: 'nowrap' }} level={3}>2,654 links</Title>
			<Select className={cls.sort__select} options={arr} />
		</div>
	</>)
}

export default SortBlock;