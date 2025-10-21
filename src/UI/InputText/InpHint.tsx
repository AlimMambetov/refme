'use client'
import React, { useEffect, useRef, useState } from 'react';
import cls from './style.module.scss';
import { AnimatePresence, motion, MotionProps } from 'framer-motion';

export const InpHint = ({ clear, value, SET_hintVisible, setIsTouched, hintVisible = false, setter, inpRef, isRecent, popular, advice }: any) => {
	const [recentArr, SET_recentArr] = useState([]);
	const [adviceArr, SET_adviceArr] = useState([]);
	const isAdvice = value?.length > 0 && hintVisible;
	const isVisible = hintVisible && (isAdvice ? (adviceArr?.length > 0) : (recentArr?.length > 0 || popular?.length > 0));
	const timeout = useRef<any>(null)

	function findSuggestions(searchTerm = '', suggestions = [], options: any = {}) {
		const {
			caseSensitive = false,
			limit = 10,
			exactMatch = false
		} = options;

		if (!searchTerm) return suggestions.slice(0, limit);

		const term = caseSensitive ? searchTerm : searchTerm.toLowerCase();

		return suggestions.filter((suggestion = '') => {
			const text = caseSensitive ? suggestion : suggestion.toLowerCase();

			if (exactMatch) {
				return text === term;
			}

			return text.includes(term);
		}).slice(0, limit);
	}

	useEffect(() => {
		if (!advice || !advice?.length) return;
		clearTimeout(timeout.current);
		timeout.current = setTimeout(() => {
			SET_adviceArr(findSuggestions(value, advice) || [])
		}, 300);
	}, [value])

	const setValue = (str: string) => {
		setIsTouched(false);
		SET_hintVisible(false);
		const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
			window.HTMLInputElement.prototype,
			"value"
		)?.set;
		if (nativeInputValueSetter) {
			nativeInputValueSetter.call(inpRef.current, str);
			const event = new Event('input', { bubbles: true });
			inpRef.current?.dispatchEvent(event);
		}
	}


	const recentTest = (hintVisible && isRecent && !isAdvice && recentArr?.length > 0);
	const popularTest = (hintVisible && !isAdvice && popular?.length > 0);
	const adviceTest = (isAdvice && adviceArr?.length > 0);

	const animFade = {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
	} as MotionProps;

	return (<>
		<div data-visible={isVisible} className={cls.hint}>
			<AnimatePresence mode='wait'>
				{recentTest && <motion.div key={`recent-${recentTest}`}  {...animFade} className={cls.recent}>
					<p className={cls.hint__desc}>You recent searches</p>
					<div className={cls.list}>
						{recentArr.map((el: any, i: number) => <div className={cls.chips} key={i}>{el}</div>)}
					</div>
				</motion.div>}
				{popularTest && <motion.div key={`popular-${popularTest}`} {...animFade} className={cls.popular}>
					<p className={cls.hint__desc}>Popular searches</p>
					<div className={cls.list}>
						{popular.map((el: any, i: number) => <div className={cls.tag} onClick={() => setValue(el)} key={i}>{el}</div>)}
					</div>
				</motion.div>}
				{adviceTest && <motion.div key={`advice-${adviceTest}`} {...animFade} className={cls.advice}>
					{adviceArr.map((el: any, i: number) => <div className={cls.advice__item} onClick={() => setValue(el)} key={i}>{el}</div>)}
				</motion.div>}
			</AnimatePresence>
		</div>
	</>)
}

export default InpHint;