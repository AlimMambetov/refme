'use client'
import React from 'react';
import cls from './style.module.scss';
import { useUI } from '@/UI';
import { Navigation } from '@/components';
import { useIsDesktop } from '@/hooks';

export const Footer = (props: any) => {
	const { Button, Icon } = useUI();
	const isDesktop = useIsDesktop();

	return (<>
		<footer data-desktop={isDesktop} className={cls.footer}>
			<div className={`container ${cls.grid}`}>
				<div className={cls.info}>
					<Icon name='full-logo' />
					<Navigation />
					<div className={cls.socials}>
						<Icon name='instagram' />
						<Icon name='facebook' />
					</div>
				</div>
				<div className={cls.btns}>
					<Button w={!isDesktop ? '100%' : ''}>Get it on Google Play <Icon name='google' /></Button>
					<Button w={!isDesktop ? '100%' : ''}>Get it on App Store <Icon name='apple' /></Button>
				</div>
			</div>
			<p className={cls.desc}>© All rights reserved</p>
			<p className={cls.desc}>version: {process.env.APP_VERSION || undefined}</p>
		</footer>
	</>)

}

export default Footer;