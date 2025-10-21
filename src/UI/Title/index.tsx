'use client'
import React from 'react'
import cls from './style.module.scss'
import { motion, MotionProps } from 'framer-motion'
import clsx from 'clsx'

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6

export type T_TitleProps = {
	level?: HeadingLevel
	lines?: number
	variant?: 'hero' | '120' | 'semibold'
} & MotionProps &
	React.ComponentProps<`h${HeadingLevel}`>

const headingTags = {
	1: motion.h1,
	2: motion.h2,
	3: motion.h3,
	4: motion.h4,
	5: motion.h5,
	6: motion.h6,
} as const

export const Title = ({
	children,
	level = 1,
	lines,
	className,
	style,
	variant,
	...props
}: T_TitleProps) => {
	const MotionHeading = headingTags[variant == 'hero' ? 1 : level]

	return (
		<MotionHeading
			{...props}
			data-var={variant || null}
			data-lines={lines ? true : null}
			style={{ '--lines': lines, ...style } as React.CSSProperties}
			className={clsx(className, cls.title)}
		>
			{children}
		</MotionHeading>
	)
}

export default Title