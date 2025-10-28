'use client'
import React, { ComponentProps, CSSProperties, ReactNode } from 'react';
import cls from './style.module.scss';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import Icon, { T_IconNames } from '../Icon.ui';


export type T_TagProps = ComponentProps<typeof motion.div> & {
	className?: string | string[];
	children?: ReactNode;
	style?: CSSProperties;
	color?: 'default' | 'blue' | 'green' | 'yellow' | 'white';
	icon?: T_IconNames
}


export const Tag = ({ children, color = 'default', icon, className, style, ...props }: T_TagProps) => {


	const ops = {
		...props,
		style,
		className: clsx(cls.tag, className),
		"data-color": color,
	} as ComponentProps<typeof motion.div>


	return (<><motion.div {...ops}  >
		{icon && <Icon name={icon} />}
		{children}
	</motion.div></>)
}

export default Tag;