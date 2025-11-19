'use client'
import React from 'react';
import cls from './style.module.scss';
import dynamic from 'next/dynamic';
import { HeroBlock, SearchLinkBlock } from '@/components/modules';

export const Main = (props: any) => {

	return (<>
		<HeroBlock />
		<SearchLinkBlock />
	</>)
}

export default Main;