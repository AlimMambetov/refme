'use client'
import React from 'react';
import cls from './style.module.scss';
import clsx from 'clsx';
import { motion, MotionProps } from 'framer-motion';

export type T_TextProps =
	React.ComponentProps<'p'> &
	React.ComponentProps<typeof motion.p> & {
		lines?: number;
		level?: 'body' | 'body-2' | 'desc' | 'desc-2' | 'label' | 'label-2';
		variant?: 'hug' | 'medium' | 'underline';
	} & MotionProps;

export const Text = ({ children, lines, style, className, variant, level = 'body', ...props }: T_TextProps) => {

	return (<>
		<motion.p
			{...props}
			className={clsx(className, cls.text)}
			data-lines={lines ? true : null}
			data-var={variant}
			data-level={level}
			style={{ '--lines': lines, ...style } as React.CSSProperties}
		>
			{children}
		</motion.p>
	</>)
}

export default Text;