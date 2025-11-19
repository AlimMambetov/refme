'use client'
import React from 'react';
import cls from './style.module.scss';
import { useIsDesktop } from '@/hooks';
import { Button, Icon } from '@/components/ui';
import { Navigation } from '@/components/common';

export const Footer = (props: any) => {
	const isDesktop = useIsDesktop();

	return (<>
		<footer data-desktop={isDesktop} className={cls.footer}>
			<div className={`container ${cls.grid}`}>
				<div className={cls.info}>
					<div className={cls.info__box}>
						<Icon name='full-logo' />
						<Navigation />
						<div className={cls.socials}>
							<Icon name='instagram' />
							<Icon name='facebook' />
						</div>
					</div>
					<a href='mailto:help@refme.com' className={cls.desc}>help@refme.com</a>
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