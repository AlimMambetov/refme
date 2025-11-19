'use client'
import React from 'react';
import cls from './style.module.scss';
import { useRouter } from 'next/navigation';
import { useScreen } from '@/hooks';
import { Icon, Title } from '@/components/ui';

export const CompanyCard = ({
	title = '',
	links = 138,
	followers = 32,
	liked = false,
	preview = '/images/test-logo.png',
	mask = true,
}: any) => {
	const router = useRouter();
	const { isDesktop } = useScreen();

	const toCard = () => {
		router.push('/companies/company-name')
	}

	return (<>
		<div data-desktop={isDesktop} onClick={toCard} data-mask={mask} className={cls.wrap}>
			<img className={cls.img} src={preview} alt="preview" />
			<Title level={isDesktop ? 4 : 5} className={cls.title}>{title}</Title>

			<p data-name='followers' className={cls.text}><b>{followers}</b> followers</p>
			<p data-name='links' className={cls.text}><b>{links}</b> links</p>

			<Icon data-liked={liked} className={cls.like} name='heart' />
		</div>
	</>)
}

export default CompanyCard;