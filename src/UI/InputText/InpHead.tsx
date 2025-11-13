'use client'
import React from 'react';
import cls from './style.module.scss';

export const InpHead = ({ label, type, forgot, }: any) => {
	// if (!label && type != 'password') return;


	return (<><div className={cls.head}>
		{label && <div className={cls.label}>{label}</div>}
		{(forgot) && forgot}
	</div></>)
}

export default InpHead;