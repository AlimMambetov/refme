'use client'
import React, { useEffect, useRef, useState } from 'react';
import cls from './style.module.scss';
import { useUI } from '@/UI';
import { useActions, useIsDesktop } from '@/hooks';

export const LinkCard = ({ preview = true }: any) => {
	const { Text, LinkText, Tag, Icon, Button } = useUI();
	const isDesktop = useIsDesktop();
	const { OPEN_MODAL } = useActions()


	return (<>
		<div onClick={() => OPEN_MODAL()} data-preview={preview} data-desktop={isDesktop} className={cls.wrap}>
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
			<div onClick={e => e.stopPropagation()} className={cls.foot}>
				<LinkText />
				<Button className={cls.use} size={isDesktop ? 'big' : 'small'} variant='secondary'>{isDesktop ? 'Use link now' : 'Use'}<Icon name='link' /></Button>
			</div>
		</div>
	</>)
}

export default LinkCard;