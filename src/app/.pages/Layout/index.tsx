'use client'
import React, { useState } from 'react';
import cls from './style.module.scss';
import { Footer, Header } from '@/templates';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useUI } from '@/UI';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import { ModalBarLink } from '@/components';

export function Layout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	const pathname = usePathname();
	const { Button, Icon } = useUI();
	const [visibleTopBtn, SET_visibleTopBtn] = useState(false);
	const { scrollY } = useScroll();

	useMotionValueEvent(scrollY, 'change', (latest) => {
		const currentScroll = Math.floor(latest);
		if (currentScroll > 300) SET_visibleTopBtn(true);
		else SET_visibleTopBtn(false);
	});

	const scrollTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth' // или 'auto' для мгновенного скролла
		});
	}

	if (pathname == '/auth') return (children)

	return (<>
		<ModalBarLink />
		<Header />
		<main>
			{children}
		</main>
		<Footer />
		<Button onClick={scrollTop} data-visible={visibleTopBtn} className={cls.top}><Icon name='top' /></Button>
	</>)
}

export default Layout;