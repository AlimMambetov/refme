'use client'
import React, { CSSProperties, useState } from 'react';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import { ModalBarLink } from '@/components/common';
import { Footer, Header } from '@/components/layout';
import { Button, Icon } from '@/components/ui';

export function LayoutProvider({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	const pathname = usePathname();
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


	const btnTopStyles = {
		"position": "fixed",
		"right": '5%',
		"bottom": '5%',
		"zIndex": 5,
		"aspectRatio": 1,
		"opacity": visibleTopBtn ? 1 : 0,
		"pointerEvents": visibleTopBtn ? 'auto' : 'none',
		"transition": 'opacity 0.3s',
	} as CSSProperties

	if (pathname == '/auth') return (children)

	return (<>
		<ModalBarLink />
		<Header />
		<main>
			{children}
		</main>
		<Footer />
		<Button onClick={scrollTop} style={btnTopStyles}><Icon name='top' /></Button>
	</>)
}

export default LayoutProvider;