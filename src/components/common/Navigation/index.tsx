'use client'
import React from 'react';
import cls from './style.module.scss';
import clsx from 'clsx';
import Link from 'next/link';
import { v4 as setId } from 'uuid';
import { usePathname } from 'next/navigation';

const navs = [
	{ id: setId(), text: 'Links', route: '/links' },
	{ id: setId(), text: 'Companies', route: '/companies' },
	{ id: setId(), text: 'FAQ', route: '/faq' }
]

const RenderLink = (el: any) => {
	const pathname = usePathname();

	return (<Link data-active={pathname == el.route || (el.route == '/links' && pathname == '/')} href={el.route} key={el.id}>{el.text}</Link>)
}

export const Navigation = ({ className = null }: any) => {

	return (<>
		<nav className={clsx(cls.nav, className)}>
			{navs.map(RenderLink)}
		</nav>
	</>)
}

export default Navigation;