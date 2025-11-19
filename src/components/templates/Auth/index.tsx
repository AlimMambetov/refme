'use client'
import React from 'react';
import cls from './style.module.scss';
import dynamic from 'next/dynamic';
import { AuthBlock } from '@/components/modules';

export const Auth = (props: any) => {


	return (
		<>
			<div className={cls.wrap}>
				<div className={`${cls.content} container`}>
					<AuthBlock />
				</div>
			</div>
		</>
	)
}

export default Auth;