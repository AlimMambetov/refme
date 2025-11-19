'use client'
import React from 'react';
import cls from './style.module.scss';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useScreen } from '@/hooks';
import { Button, Icon, Text, Title } from '@/components/ui';
import { LinkCard, SortBlock } from '@/components/common';

export const Company = (props: any) => {
	const router = useRouter();
	const pathname = usePathname();
	const [_, route, companyName] = pathname.split('/');
	const { isDesktop } = useScreen();


	const back = () => router.back();


	return (<><div data-desktop={isDesktop} className={`${cls.wrap} container`} >
		<div className={cls.head}>
			{isDesktop && <Button className={cls.back} onClick={back} variant='secondary' size='small'><Icon name='back' />  Back</Button>}
			<div className={`${cls.nav} mini-cont`}><Link href={'/companies'}>{route}</Link> / <b>{companyName}</b></div>

			<div className={`${cls.info} mini-cont`}>
				<div className={cls.info__preview}><img src="/images/test-logo.png" /></div>
				<Title level={isDesktop ? 1 : 2} className={cls.info__title}>Company  Name</Title>
				<div className={cls.info__btns}>
					<Button className={cls.btn_link} size='middle' variant='secondary'><Icon name='link' /></Button>
					<Button className={cls.btn_follow} size='middle' variant='primary'>Follow <Icon name='heart' /></Button>
				</div>
				<div className={cls.info__state}>
					<div className={cls.state}><Title level={4}>73</Title> <Text level='desc' variant='hug'>followers</Text></div>
					<div className={cls.state}><Title level={4}>477</Title> <Text level='desc' variant='hug'>links</Text></div>
				</div>
				<div className={cls.info__desc}>We are a digital-first platform dedicated to helping users save more on their favorite brands. Our team curates the latest and most reliable promo codes, discounts, and exclusive deals across a wide range of categories. With a focus on user experience and trust, we ensure every offer is verified and up to date. Start saving smarter – every time you shop.</div>
			</div>
		</div>
		<div className={`${cls.content} mini-cont`}>
			<SortBlock />
			<div className={cls.cards}>
				<LinkCard preview={false} />
				<LinkCard preview={false} />
				<LinkCard preview={false} />
				<LinkCard preview={false} />
				<LinkCard preview={false} />
				<LinkCard preview={false} />
				<Button size='big' variant='secondary'>Show more</Button>
			</div>
		</div>
	</div></>)
}

export default Company;