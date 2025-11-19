'use client'
import React, { useEffect, useState } from 'react';
import cls from './style.module.scss';
import { useIsDesktop } from '@/hooks';
import clsx from 'clsx';
import { LinkCard, SearchBlock, SortBlock, TopCompanies } from '@/components/common';
import { Button, Icon } from '@/components/ui';


const Search = () => {

	return (<>
		<div className={cls.search}>
			<SearchBlock />
			<SortBlock />
		</div>
	</>)
}

export const SearchLinkBlock = (props: any) => {
	const isDesktop = useIsDesktop();


	return (<>
		<div data-desktop={isDesktop} className={`${cls.wrap} container`}>
			{!isDesktop && <TopCompanies device="phone" />}
			<Search />
			{
				isDesktop && <div className={cls.top}>
					<div className={cls.top__pin}>
						<TopCompanies />
						<Button w='100%' variant='accent'>Post referral link <Icon name='plus' /></Button>
					</div>
				</div>
			}

			<div className={cls.cards}>
				<LinkCard />
				<LinkCard />
				<LinkCard />
				<LinkCard />
				<LinkCard />
				<LinkCard />
				<Button size={isDesktop ? 'big' : 'middle'} variant='secondary'>Show more</Button>
			</div>
		</div>
	</>)



}

export default SearchLinkBlock;