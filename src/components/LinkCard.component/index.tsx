'use client'
import React, { useEffect, useRef, useState } from 'react';
import cls from './style.module.scss';
import { useUI } from '@/UI';
import { useIsDesktop } from '@/hooks';

export const LinkCard = ({ preview = true }: any) => {
	const { Text, Tag, Icon, Button } = useUI();
	const [isCopy, SET_isCopy] = useState(false);
	const copyTimeout = useRef<any>(null);
	const isDesktop = useIsDesktop();
	const copyText = 'https://www.link.com/referral/moneyback/offer';



	const copyAction = async () => {
		try {
			await navigator.clipboard.writeText(copyText);
			clearTimeout(copyTimeout.current)
			SET_isCopy(true);
			copyTimeout.current = setTimeout(() => {
				SET_isCopy(false)
			}, 1000);
		} catch (err) {
			console.error('Ошибка копирования:', err);
		}
	}

	useEffect(() => {
		return () => {
			clearTimeout(copyTimeout.current)
		}
	}, [])



	return (<>
		<div data-preview={preview} data-desktop={isDesktop} className={cls.wrap}>
			{preview && <div className={cls.logo}>
				<img src="/images/test-logo.png" />
			</div>}
			<div className={cls.info}>
				<Text lines={isDesktop ? 3 : 10} className={cls.text} level='body'>The main terms and benefits of using the link will be written here – you can limit the number of characters or hide anything beyond three lines with an ellipsis</Text>
			</div>
			<div className={cls.tags}>
				<Tag color="blue" icon='user-tick'>user1234</Tag>
				<Tag color="green" icon='certificate'>security checked</Tag>
				<Tag icon='time-duration'>2 h. ago</Tag>
			</div>
			<div className={cls.foot}>
				<div className={cls.copy}>
					<a target='_blank' href={copyText}>{copyText}</a>
					<div data-copy={isCopy} className={cls.copy__icon} onClick={copyAction}>
						{isCopy
							? <Icon name='tick' />
							: <Icon name='copy' />
						}
					</div>
				</div>
				<Button className={cls.use} size={isDesktop ? 'big' : 'small'} variant='secondary'>{isDesktop ? 'Use link now' : 'Use'}<Icon name='link' /></Button>
			</div>
		</div>
	</>)
}

export default LinkCard;