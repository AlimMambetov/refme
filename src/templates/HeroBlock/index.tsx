'use client'
import React, { useEffect, useState } from 'react';
import cls from './style.module.scss';
import { useUI } from '@/UI';
import { Card } from '@/components';
import { useIsDesktop } from '@/hooks';

export const HeroBlock = (props: any) => {
	const { Title, Text, Button, Icon } = useUI();
	const isDesktop = useIsDesktop();
	const [modalIsOpen, SET_modalIsOpen] = useState(false);


	const closeModal = () => {
		SET_modalIsOpen(false);
	}

	const openModal = () => {
		SET_modalIsOpen(true);
	}


	useEffect(() => {
		if (isDesktop) {
			document.body.style.overflow = 'auto';
			return
		}
		if (modalIsOpen) document.body.style.overflow = 'hidden';
		else document.body.style.overflow = 'auto';

	}, [isDesktop, modalIsOpen])

	if (isDesktop) return (<>
		<div className={`${cls.wrap} container`}>
			<div className={cls.grid}>
				<Title variant='hero' className={cls.grid__title}>Start earning and saving money on referral programs easy with our service – RefMe</Title>
				<Text level='desc' className={cls.grid__desc} >You don't need an account to view and use links, but you do need to sign up or log in to post your referral links</Text>
				<Button className={cls.grid__btn} >Post referral link now <Icon name='unlink' /></Button>
			</div>
			<div className={cls.cards}>
				<Card variant='primary' num={1} title={'Use referral links'} desc={'Register on the services or buy products using referral links and receive gifts, money, premium terms, discounts and more'} />
				<Card variant='accent' num={2} title={'Post referral links'} desc={'Post your link on our website and receive the rewards provided by your referral system for everyone who uses the link'} />
			</div>
		</div>
	</>)

	else return (<>
		<div className={`${cls.mobile}`}>
			<div className={`${cls.mobile__cont}  container`}>
				<Title level={2} className={cls.mobile__title}  >Earn and save money on referral programs easy with RefMe</Title>
				<Button onClick={openModal} w='100%' variant='accent' className={cls.mobile__btn} >How it works</Button>
			</div>
		</div>

		<div onClick={closeModal} data-open={modalIsOpen} className={cls.modal}>
			<div onClick={e => e.stopPropagation()} className={cls.modal__content}>
				<Icon onClick={closeModal} className={cls.modal__close} name='circle-cross' />

				<Title lines={3} className={cls.modal__title} level={2} >How it works</Title>
				<Text level='desc' className={cls.modal__desc} >You don't need an account to view and use links, but you do need to sign up or log in to post your referral links</Text>
				<div className={cls.modal__cards}>
					<Card device='phone' variant='primary' num={1} title={'Use referral links'} desc={'Register on the services or buy products using referral links and receive gifts, money, premium terms, discounts and more'} />
					<Card device='phone' variant='accent' num={2} title={'Post referral links'} desc={'Post your link on our website and receive the rewards provided by your referral system for everyone who uses the link'} />
				</div>
				<Button w='100%' className={cls.modal__btn} >Post referral link now <Icon name='unlink' /></Button>
			</div>
		</div>
	</>)
}

export default HeroBlock;