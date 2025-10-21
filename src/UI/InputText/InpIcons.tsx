'use client'
import React from 'react';
import cls from './style.module.scss';
import { AnimatePresence, motion, MotionProps } from "framer-motion";
import { Icon, T_IconNames } from './Icons'

export const InpIcons = ({ children, value, clear, iconL, iconR, handleIconClick, togglePasswordVisibility, type, inputType }: any) => {


	const IconL = (typeof iconL == 'string' || iconL === true) ? <Icon name={iconL.toString() as T_IconNames} /> : iconL;
	const IconR = (typeof iconR == 'string' || iconR === true) ? <Icon name={iconR.toString() as T_IconNames} /> : iconR;

	const iconAnimation = {
		initial: { opacity: 0, scale: 0.8 },
		animate: { opacity: 1, scale: 1 },
		exit: { opacity: 0, scale: 0.5 },
		transition: { ease: 'easeInOut', duration: 0.1 }
	} as MotionProps

	return (<>

		<AnimatePresence mode="wait">
			{iconL && <motion.div
				key={String(iconL)}
				{...iconAnimation}
				onClick={handleIconClick('L')}
				className={cls.inp__icon}
			> {IconL} </motion.div>}
			{(!iconL && type == 'search') && <motion.div
				key={String(iconL)}
				{...iconAnimation}
				onClick={handleIconClick('L')}
				className={cls.inp__icon}
			> <Icon name='search' /> </motion.div>}
		</AnimatePresence>

		{children}
		<AnimatePresence mode="wait">
			{iconR && <motion.div
				key={String(iconR)}
				{...iconAnimation}
				onClick={handleIconClick('R')}
				className={cls.inp__icon}
			> {IconR} </motion.div>}
			{
				(!iconR && type == 'password') && <motion.div
					key={String(inputType)}
					{...iconAnimation}
					onClick={togglePasswordVisibility}
					className={cls.inp__icon}
				>
					<Icon name={inputType !== 'password' ? 'eye-open' : 'eye-close'} />
				</motion.div>
			}
			{
				(!iconR && type == 'search' && value.length) && <motion.div
					{...iconAnimation}
					onClick={clear}
					className={cls.inp__icon}
				>
					<Icon name={'close'} />
				</motion.div>
			}
		</AnimatePresence>
	</>)
}

export default InpIcons;