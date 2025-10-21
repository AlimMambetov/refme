'use client'
import React from 'react';
import cls from './style.module.scss';
import { useUI } from '@/UI';
import { useRouter } from 'next/navigation';
import { useDevice } from '@/hooks';

export const CompanyCard = ({
	title = '',
	links = 138,
	followers = 32,
	liked = false,
	preview = '/images/test-logo.png',
	mask = true,
}: any) => {
	const { Icon, Title } = useUI();
	const router = useRouter();
	const { isDesktop } = useDevice();

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