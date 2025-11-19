'use client'
import React from 'react';
import cls from './style.module.scss';
import { useIsDesktop } from '@/hooks';
import { Title } from '@/components/ui';

export const FAQMainBlock = (props: any) => {
	const isDesktop = useIsDesktop();

	return (<><div data-desktop={isDesktop} className={`${cls.wrap} container`}>
		<div className={cls.titles}>
			<Title level={isDesktop ? 1 : 3} className={cls.title}>Got any questions?</Title>
			<Title level={isDesktop ? 1 : 3} style={{ color: '#8692A1' }} className={cls.title}>We've got answers.</Title>
		</div>
	</div></>)
}

export default FAQMainBlock;