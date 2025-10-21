'use client'
import React from 'react';
import cls from './style.module.scss';

export const InpHead = ({ label, type, forgot = '', }: any) => {
	if (!label && type != 'password') return;

	return (<><div className={cls.head}>
		{label && <div className={cls.label}>{label}</div>}
		{(type == 'password' && forgot) && <a href='/' className={cls.forgot}>Forgot?</a>}
	</div></>)
}

export default InpHead;