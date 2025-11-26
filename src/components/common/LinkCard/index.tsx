'use client'
import React, { useEffect, useRef, useState } from 'react';
import cls from './style.module.scss';
import { useActions, useIsDesktop } from '@/hooks';
import { Button, Icon, LinkText, Tag, Text } from '@/components/ui';

export const LinkCard = ({ preview = true, description, company }: any) => {
	const isDesktop = useIsDesktop();
	const { OPEN_MODAL } = useActions()?.baseAction


	return (<>
		<div onClick={() => OPEN_MODAL()} data-preview={preview} data-desktop={isDesktop} className={cls.wrap}>
			{preview && <div className={cls.logo}>
				<img src="/images/test-logo.png" />
			</div>}
			<div className={cls.info}>
				<Text lines={isDesktop ? 3 : 10} className={cls.text} level='body'>{description}</Text>
			</div>
			<div className={cls.tags}>
				<Tag color="blue" icon='user-tick'>user1234</Tag>
				<Tag color="green" icon='certificate'>security checked</Tag>
				<Tag icon='time-duration'>2 h. ago</Tag>
			</div>
			<div onClick={e => e.stopPropagation()} className={cls.foot}>
				<LinkText />
				<Button className={cls.use} size={isDesktop ? 'big' : 'small'} variant='secondary'>{isDesktop ? 'Use link now' : 'Use'}<Icon name='link' /></Button>
			</div>
		</div>
	</>)
}

export default LinkCard;