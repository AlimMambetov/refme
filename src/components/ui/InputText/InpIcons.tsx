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

	const renderRightIcon = () => {
		if (iconR) {
			return { icon: IconR, onClick: handleIconClick('R'), key: String(iconR) };
		}
		if (!iconR && type == 'password') {
			return {
				icon: <Icon name={inputType !== 'password' ? 'eye-open' : 'eye-close'} />,
				onClick: togglePasswordVisibility,
				key: inputType
			};
		}
		if (!iconR && type == 'search' && value.length > 0) {
			return { icon: <Icon name='close' />, onClick: clear, key: 'close' };
		}
		return null;
	};

	const rightIcon = renderRightIcon();

	return (<>
		<AnimatePresence mode="wait">
			{iconL && (
				<motion.div
					key={String(iconL)}
					{...iconAnimation}
					onClick={handleIconClick('L')}
					className={cls.inp__icon}
				> {IconL} </motion.div>
			)}
			{(!iconL && type == 'search') && (
				<motion.div
					key="search"
					{...iconAnimation}
					onClick={handleIconClick('L')}
					className={cls.inp__icon}
				> <Icon name='search' /> </motion.div>
			)}
		</AnimatePresence>

		{children}

		<AnimatePresence mode="wait">
			{rightIcon && (
				<motion.div
					key={rightIcon.key}
					{...iconAnimation}
					onClick={rightIcon.onClick}
					className={cls.inp__icon}
				> {rightIcon.icon} </motion.div>
			)}
		</AnimatePresence>
	</>)
}

export default InpIcons;