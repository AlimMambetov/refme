'use client'
import React, { useEffect, useRef, useState } from 'react';
import cls from './style.module.scss';


type SelectOption = {
	label: string;
	value: string | number;
};


export type T_SelectProps = {
	isMulti?: boolean;
	options: SelectOption[];
	value?: string | number | (string | number)[] | null;
	title?: string | null;
	onChange?: (selected: SelectOption | null) => void;
	className?: string | null;
};



const selectIcon = <svg className={cls.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
	<path d="M8.12188 3.464C8.78688 2.798 9.90589 3.224 9.99389 4.126L9.99988 4.241V20C9.9996 20.2549 9.90201 20.5 9.72704 20.6854C9.55207 20.8707 9.31293 20.9822 9.05849 20.9972C8.80405 21.0121 8.55351 20.9293 8.35805 20.7657C8.1626 20.6021 8.03699 20.3701 8.00688 20.117L7.99988 20V6.414L5.70688 8.707C5.52693 8.88635 5.28545 8.99047 5.0315 8.99823C4.77755 9.00598 4.53017 8.91679 4.33961 8.74875C4.14904 8.58072 4.02958 8.34645 4.00549 8.09353C3.98139 7.8406 4.05447 7.58799 4.20988 7.387L4.29288 7.293L8.12288 3.463L8.12188 3.464ZM14.9999 3C15.2448 3.00003 15.4812 3.08996 15.6643 3.25272C15.8473 3.41547 15.9642 3.63975 15.9929 3.883L15.9999 4V17.586L18.2929 15.293C18.4728 15.1137 18.7143 15.0095 18.9683 15.0018C19.2222 14.994 19.4696 15.0832 19.6602 15.2512C19.8507 15.4193 19.9702 15.6536 19.9943 15.9065C20.0184 16.1594 19.9453 16.412 19.7899 16.613L19.7069 16.707L15.8769 20.537C15.2129 21.202 14.0939 20.776 14.0059 19.874L13.9999 19.759V4C13.9999 3.73478 14.1052 3.48043 14.2928 3.29289C14.4803 3.10536 14.7347 3 14.9999 3Z" />
</svg>

const arrowIcon = <svg className={cls.arrow} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" fill="none">
	<path fillRule="evenodd" clipRule="evenodd" d="M6.35367 7.85367C6.25991 7.94741 6.13275 8.00007 6.00017 8.00007C5.86759 8.00007 5.74044 7.94741 5.64667 7.85367L2.81817 5.02517C2.77042 4.97905 2.73233 4.92388 2.70612 4.86287C2.67992 4.80187 2.66612 4.73626 2.66555 4.66987C2.66497 4.60348 2.67762 4.53764 2.70276 4.47619C2.7279 4.41475 2.76503 4.35892 2.81197 4.31197C2.85892 4.26503 2.91475 4.2279 2.97619 4.20276C3.03764 4.17762 3.10348 4.16497 3.16987 4.16555C3.23626 4.16612 3.30187 4.17992 3.36287 4.20612C3.42388 4.23233 3.47905 4.27042 3.52517 4.31817L6.00017 6.79317L8.47517 4.31817C8.56947 4.22709 8.69577 4.1767 8.82687 4.17783C8.95797 4.17897 9.08338 4.23156 9.17608 4.32426C9.26879 4.41697 9.32137 4.54237 9.32251 4.67347C9.32365 4.80457 9.27325 4.93087 9.18217 5.02517L6.35367 7.85367Z" />
</svg>

const tickIcon = <svg className={cls.tick} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none">
	<path fillRule="evenodd" clipRule="evenodd" d="M14.1276 3.64343C14.2526 3.76845 14.3228 3.93799 14.3228 4.11477C14.3228 4.29154 14.2526 4.46108 14.1276 4.5861L6.63297 12.0814C6.56487 12.1496 6.48401 12.2036 6.39502 12.2405C6.30603 12.2774 6.21064 12.2963 6.11431 12.2963C6.01797 12.2963 5.92259 12.2774 5.83359 12.2405C5.7446 12.2036 5.66374 12.1496 5.59564 12.0814L1.87164 8.35743C1.8097 8.29549 1.76057 8.22196 1.72704 8.14103C1.69352 8.0601 1.67627 7.97336 1.67627 7.88577C1.67627 7.79817 1.69352 7.71143 1.72704 7.6305C1.76057 7.54957 1.8097 7.47604 1.87164 7.4141C1.93358 7.35216 2.00711 7.30303 2.08804 7.2695C2.16897 7.23598 2.25571 7.21873 2.34331 7.21873C2.4309 7.21873 2.51764 7.23598 2.59857 7.2695C2.6795 7.30303 2.75303 7.35216 2.81497 7.4141L6.11497 10.7141L13.1843 3.64343C13.3093 3.51845 13.4789 3.44824 13.6556 3.44824C13.8324 3.44824 14.0026 3.51845 14.1276 3.64343Z" />
</svg>

export const Select = ({ options = [], className, value, title = 'Selected', onChange, isMulti = false }: T_SelectProps) => {
	const [isOpen, SET_isOpen] = useState(false);
	const [multiValues, SET_multiValues] = useState([]);
	const [activeValue, SET_activeValue] = useState<any>(isMulti ? (value || []) : value || null);
	const findDataIndex = options.findIndex(el => el.value == activeValue);
	const activeItem = options[findDataIndex] as any;
	const selectRef = useRef<any>(null);

	// if (typeof window !== 'undefined')

	useEffect(() => {
		if (onChange) onChange(activeValue);
	}, [activeValue])


	const handleSelect = (value: any) => {
		if (!isMulti) SET_activeValue(value);
		if (!isMulti) SET_isOpen(false);
		if (isMulti) {
			SET_multiValues((prev: any) => {
				const isAlreadySelected = prev.some((el: any) => el === value);
				if (!value) return prev;
				return isAlreadySelected
					? prev.filter((el: any) => el !== value)
					: [...prev, value];
			})
		}
	};

	const onClear = () => {
		SET_multiValues([])
		SET_activeValue([])
		SET_isOpen(false);
	}

	const onApply = () => {
		SET_activeValue(multiValues)
		SET_isOpen(false);
	}


	useEffect(() => handleSelect(value), [value])

	const closeSelect = () => SET_isOpen(false);


	useEffect(() => {
		const closeHint = (e: any) => {
			if (selectRef.current && !selectRef.current.contains(e.target)) {
				closeSelect()
			}
		};
		window.addEventListener('click', closeHint);
		return () => {
			window.removeEventListener('click', closeHint);
		}
	}, [])

	return (<>
		<div ref={selectRef} data-multi={isMulti} data-active={isOpen} className={`${cls.select} ${className}`}>
			<div data-active={isOpen} onClick={() => SET_isOpen(prev => !prev)} className={cls.select__preview}>
				{selectIcon}
				<p>{isMulti ? title : (activeItem?.label || 'Select an option...')}</p>
				<span className={cls.select__num} data-visible={(activeValue?.length && isMulti) ? true : false}>{activeValue?.length ? activeValue?.length : ''}</span>
				{arrowIcon}
			</div>
			<div data-active={isOpen} className={cls.select__list}>
				{options.map((el: any, i) =>
					<div
						data-active={!isMulti ? (el.value == activeValue) : (multiValues.find(val => val == el.value) && true)}
						onClick={() => handleSelect(el.value)}
						className={cls.select__item}
						key={i}
					>
						<span className={cls.check}>{tickIcon}</span>
						<p>{el.label}</p>
						{tickIcon}
					</div>)}
				{(isMulti && JSON.stringify(multiValues) !== JSON.stringify(activeValue)) && <div className={cls.btns}>
					<button onClick={onClear} data-btn="clear">Clear all</button>
					<button onClick={onApply} data-btn="apply">Apply selected</button>
				</div>}
			</div>
		</div>
	</>)
}

export default Select;