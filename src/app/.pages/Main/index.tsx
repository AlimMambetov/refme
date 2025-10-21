'use client'
import React from 'react';
import cls from './style.module.scss';
import { HeroBlock, SearchLinkBlock } from '@/templates';
import dynamic from 'next/dynamic';

export const Main = (props: any) => {

	return (<>
		<HeroBlock />
		<SearchLinkBlock />
	</>)
}

export default Main;