'use client'
import React, { useEffect } from 'react';
import cls from './style.module.scss';
import { useActions, useScreen } from '@/hooks';
import { useSelector } from 'react-redux';
import { Button, Icon, LinkText, Tag, Text, Title } from '@/components/ui';
import { T_store } from '@/types';

export const ModalBarLink = (props: any) => {
	const { modalOpen } = useSelector((state: T_store) => state.base);
	const { CLOSE_MODAL } = useActions()?.baseAction
	const { isDesktop } = useScreen();

	const desc1Arr = [
		"Earn 2x cashback on all purchases for the first 30 days",
		"Get a $20 welcome bonus credited after your first purchase",
		"Enjoy free premium membership for the first 3 months",
		"Receive exclusive early access to new features and products",
		"Unlock a higher referral reward tier for inviting others",
		"Access limited-time discounts not available to regular users",
		"Benefit from reduced transaction or service fees for your first 60 days",
		"Benefit from reduced transaction or service fees for your first 60 days",
		"Benefit from reduced transaction or service fees for your first 60 days",
		"Benefit from reduced transaction or service fees for your first 60 days",
		"Benefit from reduced transaction or service fees for your first 60 days",
		"Benefit from reduced transaction or service fees for your first 60 days",
		"Benefit from reduced transaction or service fees for your first 60 days",
	]
	const desc2Arr = [
		"You must be a new user and have never registered with Company before",
		"You must complete your first qualifying transaction within 30 days of signing up",
		"A minimum of $100 must be spent within the first month to activate the reward",
		"Only one referral code can be used per account",
		"You must not have used any other promotional offers when registering",
		"Your account must remain active and in good standing for at least 60 days",
		"You must be a new user and have never registered with Company before",
		"You must complete your first qualifying transaction within 30 days of signing up",
		"A minimum of $100 must be spent within the first month to activate the reward",
		"Only one referral code can be used per account",
		"You must not have used any other promotional offers when registering",
		"Your account must remain active and in good standing for at least 60 days",
	]



	useEffect(() => {
		if (modalOpen) document.body.style.overflow = 'hidden';
		else document.body.style.overflow = 'auto';

		return () => {
			document.body.style.overflow = 'auto';
		}
	}, [modalOpen])



	return (<>
		<div onClick={() => CLOSE_MODAL()} data-open={modalOpen} data-desktop={isDesktop} className={cls.wrap}>
			<div onClick={(e) => e.stopPropagation()} className={cls.bar}>
				<Icon onClick={() => CLOSE_MODAL()} className={cls.close} name='circle-cross' />
				<div className={cls.bar__content}>
					<div className={cls.bar__info}>
						<div data-block="info">
							<div className={cls.logo}>
								<img src="./images/test-logo.png" />
							</div>
							<Title level={isDesktop ? 2 : 3}>Company Name</Title>
							<Text level={isDesktop ? 'body' : 'body-2'}>The main terms and benefits of using the link will be written here – you can limit the number of characters or hide anything beyond three lines with an ellipsis</Text>
						</div>
						<div data-block="tags">
							<div data-box='tags'>
								<Tag color='blue' icon='user-tick'>anastasiia designer 335</Tag>
								<Tag color='green' icon='certificate'>security checked</Tag>
								<Tag color='yellow' icon='time-duration'>2 h. ago</Tag>
							</div>
							<div data-box='controlls'>
								<div data-box='icons'>
									<div data-rate="like"> <Icon name='like' /> 27 </div>
									<div data-rate="dislike"> <Icon name='dislike' />	1 </div>
								</div>
								<Button className={cls.report} size='hug' variant='subtle'>Report</Button>
							</div>
						</div>
						<div data-block="links">
							<LinkText href="https://www.link.com/referral/moneyback/offer" />
							<Button w={'100%'} size={isDesktop ? 'big' : 'middle'} variant='primary'>Use link now <Icon name='link' /></Button>
						</div>
					</div>
					<div data-block="desc">
						<div className={cls.desc}>
							<Title level={5}>Benefits</Title>
							<ul>
								{desc1Arr.map((el, i) => <li key={i}>
									<Text level='desc'>{el}</Text>
								</li>)}
							</ul>
						</div>
						<div className={cls.desc}>
							<Title level={5}>Terms of use</Title>
							<ul>
								{desc2Arr.map((el, i) => <li key={i}>
									<Text level='desc'>{el}</Text>
								</li>)}
							</ul>
						</div>
					</div>
				</div>
			</div>

		</div></>)
}

export default ModalBarLink;