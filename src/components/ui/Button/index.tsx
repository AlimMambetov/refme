'use client'
import React, { ComponentProps, CSSProperties, ReactNode } from 'react';
import cls from './style.module.scss';
import clsx from 'clsx';
import { motion } from 'framer-motion';

export type T_ButtonProps = ComponentProps<typeof motion.button> & {
	className?: string | string[];
	children?: ReactNode;
	style?: CSSProperties;
	variant?: 'primary' | 'secondary' | 'subtle' | 'accent';
	size?: 'middle' | 'small' | 'hug' | 'big';
	w?: string;
}

export const Button = ({ children, variant = 'primary', size = 'middle', w = 'fit-content', className, style, ...props }: T_ButtonProps) => {


	const ops = {
		style: { ...style, width: w } as CSSProperties,
		className: clsx(className, cls.btn),
		"data-var": variant,
		"data-size": size,
	}


	return (<motion.button whileTap={{ scale: 0.95 }}  {...({ ...props, ...ops })}>{children}</motion.button>)
}

export default Button;