'use client'
import React, { useState } from 'react';
import cls from './style.module.scss';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useIsDesktop } from '@/hooks';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import { Button, Icon } from '@/components/ui';
import { Navigation } from '@/components/common';

export const Header = ({ className = null }: any) => {
	const isDesktop = useIsDesktop();
	const router = useRouter();
	const { scrollY } = useScroll();
	const [shadowHeader, SET_shadowHeader] = useState(false);


	useMotionValueEvent(scrollY, 'change', (latest) => {
		const currentScroll = Math.floor(latest);
		if (currentScroll > 100) SET_shadowHeader(true);
		else SET_shadowHeader(false);
	});


	const refreshPage = () => {
		location.reload()
		location.href = '/';
	}



	if (isDesktop) return (<>
		<header data-shadow={shadowHeader} className={clsx(cls.header, className)}>
			<div className={`${cls.header__cont} container`} >
				<Icon onClick={refreshPage} className={cls.logo} name='full-logo' />
				<Navigation />
				<Button variant='secondary' size='small' onClick={() => router.push('/auth')}> Log in/Sign up </Button>
			</div>
		</header>
	</>)




	else return (<>
		<header data-shadow={shadowHeader} className={clsx(cls.header, className)}>
			<div className={`${cls.header__cont} container`} data-mobile>
				<Icon onClick={refreshPage} className={cls.logo} name='logo-color' />
				<Button variant='secondary' size='small' onClick={() => router.push('/auth')}> Log in/Sign up </Button>
				<Button name='menu' variant='secondary' size='small'> <Icon name='menu' /> </Button>
			</div>
		</header>
	</>)
}

export default Header;