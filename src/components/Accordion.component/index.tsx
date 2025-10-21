'use client'
import React, { useState } from 'react';
import cls from './style.module.scss';
import { useUI } from '@/UI';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsDesktop } from '@/hooks';

export const Accordion = ({ text = '', title = '' }: any) => {
	const { Title, Text, Icon, Button } = useUI();
	const [isOpen, SET_isOpen] = useState(false);
	const isDesktop = useIsDesktop();

	const handleToggleOpen = () => {
		SET_isOpen(prev => !prev)
	}

	// Анимации для контента
	const contentVariants = {
		open: {
			opacity: 1,
			height: "auto",
			transition: {
				opacity: { duration: 0.3, delay: 0.4 },
				height: { duration: 0.4, ease: "easeInOut" }
			}
		},
		collapsed: {
			opacity: 0,
			height: 0,
			transition: {
				opacity: { duration: 0.2 },
				height: { duration: 0.3, ease: "easeInOut" }
			}
		}
	};

	// Анимация для иконки
	const iconVariants = {
		open: { rotate: 45 },
		collapsed: { rotate: 0 }
	};

	return (
		<motion.div data-desktop={isDesktop} className={cls.wrap}>
			<motion.label className={cls.preview}>
				<Title level={isDesktop ? 3 : 5} className={cls.title}>{title}</Title>
				<Button
					data-open={isOpen}
					className={cls.btn}
					onClick={handleToggleOpen}
					variant='secondary'
					size={isDesktop ? 'middle' : 'small'}
				>
					<motion.span
						variants={iconVariants}
						animate={isOpen ? "open" : "collapsed"}
						transition={{ duration: 0.3, ease: "easeInOut" }}
					>
						<Icon name='plus' />
					</motion.span>
				</Button>
			</motion.label>

			<AnimatePresence initial={false}>
				{isOpen && (
					<motion.div
						className={cls.content}
						variants={contentVariants}
						initial="collapsed"
						animate="open"
						exit="collapsed"
					>
						<Text className={cls.text} dangerouslySetInnerHTML={{ __html: text }}></Text>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	)
}

export default Accordion;