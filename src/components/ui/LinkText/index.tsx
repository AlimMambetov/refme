'use client'
import React, { useEffect, useRef, useState } from 'react';
import cls from './style.module.scss';
import Icon from '../Icon';
import { useIsDesktop } from '@/hooks';

export const LinkText = ({ href = '' }: any) => {

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
		<div data-desktop={isDesktop} className={cls.wrap}>
			<a target='_blank' href={copyText}>{copyText}</a>
			<div data-copy={isCopy} className={cls.copy__icon} onClick={copyAction}>
				{isCopy
					? <Icon name='tick' />
					: <Icon name='copy' />
				}
			</div>
		</div>
	</>)
}

export default LinkText;