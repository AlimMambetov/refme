'use client'
import React, { ComponentProps, CSSProperties, ReactElement, useEffect, useRef, useState } from 'react';
import cls from './style.module.scss';
import { T_IconNames } from './Icons'
import clsx from 'clsx';
import InpHead from './InpHead';
import InpFoot from './InpFoot';
import InpHint from './InpHint';
import InpIcons from './InpIcons';
import { AnimatePresence, motion, MotionProps } from "framer-motion";


export interface InpValidationRule {
	required?: boolean;
	minLength?: number;
	maxLength?: number;
	pattern?: RegExp;
	custom?: (value: string) => boolean;
	message?: string;
	email?: boolean;
}

type T_IconSide = 'L' | 'R';
type T_Inp = 'text' | 'email' | 'search' | 'password';
type T_InpChange = {
	value: string;
	isValid: boolean;
	event: React.ChangeEvent<HTMLInputElement>;
}


export type T_InputProps = Omit<ComponentProps<'input'>, 'onChange' | 'onBlur' | 'onFocus'> & {
	value?: string;
	type?: T_Inp;
	w?: string;
	"icon-R"?: T_IconNames | ReactElement | boolean;
	"icon-L"?: T_IconNames | ReactElement | boolean;
	onIconClick?: (side: T_IconSide, event: MouseEvent) => void;
	validationRules?: InpValidationRule[];
	showValidation?: boolean;
	onChange?: (e: T_InpChange) => void;
	onBlur?: (e: T_InpChange) => void;
	onFocus?: (e: T_InpChange) => void;
	setter?: (e: string) => void;
	label?: string | ReactElement;
	message?: string | ReactElement | null | undefined;
	error?: string | ReactElement | null | undefined;
	isRecent?: boolean;
	popular?: null | string[];
	advice?: null | string[];
	forgot?: string;
}


export const InputText = (props: T_InputProps) => {
	const {
		value = '',
		type = 'text',
		className,
		children,
		style,
		w,
		"icon-L": iconL,
		"icon-R": iconR,
		onIconClick,
		placeholder = '',
		label,
		message,
		validationRules = [],
		showValidation = true,
		onChange,
		onBlur,
		onFocus,
		setter,
		required,
		isRecent = false,
		popular,
		advice,
		error,
		forgot,
		...rest
	} = props;
	const [isFocused, setIsFocused] = useState(false);
	const [isTouched, setIsTouched] = useState(false);
	const [inputType, setInputType] = useState<T_Inp>(type);
	const inpRef = useRef<HTMLInputElement>(null);
	const [hintVisible, SET_hintVisible] = useState(false);

	if (typeof window !== 'undefined')

		useEffect(() => {
			if (isFocused) SET_hintVisible(true);
		}, [isFocused])

	useEffect(() => {
		const closeHint = (e: any) => {
			if (inpRef.current && !inpRef.current.contains(e.target)) {
				SET_hintVisible(false);
			}
		};
		window.addEventListener('click', closeHint);
		return () => {
			window.removeEventListener('click', closeHint);
		}
	}, [])


	const validateInput = (eventValue?: any): { isValid: boolean; errors: string[] } => {
		let _value = eventValue || (value || inpRef.current?.value || '');
		if (!validationRules.length) return { isValid: true, errors: [] };

		const errors: string[] = validationRules
			.map(rule => {
				// Проверка на обязательное поле
				if (rule.required && !_value.trim()) return rule.message || 'This field is required';
				// Проверка минимальной длины
				if (rule.minLength && _value.length < rule.minLength) return rule.message || `Minimum length: ${rule.minLength} symbols`;
				// Проверка максимальной длины
				if (rule.maxLength && _value.length > rule.maxLength) return rule.message || `Maximum length: ${rule.maxLength} symbols`;
				// Проверка по регулярному выражению
				if (rule.pattern && !rule.pattern.test(_value)) return rule.message || 'The wrong format';
				// Кастомная валидация
				if (rule.custom && !rule.custom(_value)) return rule.message || 'The wrong meaning';
				// Валидация email
				if (rule.email && _value) {
					const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
					if (!emailRegex.test(_value)) return rule.message || 'Enter the correct email';
				}

				return null;
			})
			.filter((error): error is string => error !== null);

		return {
			isValid: errors.length === 0,
			errors
		};
	};


	const validation = validateInput();
	const shouldShowValidation = (showValidation || isTouched) && !isFocused;

	const clear = () => {
		setIsTouched(false);
		const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
			window.HTMLInputElement.prototype,
			"value"
		)?.set;
		if (nativeInputValueSetter) {
			nativeInputValueSetter.call(inpRef.current, '');
			const event = new Event('input', { bubbles: true });
			inpRef.current?.dispatchEvent(event);
		}
	}

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (onChange) onChange({ value: event.target.value, isValid: validateInput(event.target.value).isValid, event });
		if (setter) setter(event.target.value);
	}

	const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
		if (onBlur) onBlur({ value: event.target.value, isValid: validateInput(event.target.value).isValid, event });
		setIsFocused(false);
		setIsTouched(true);
	}

	const handleFocused = (event: React.FocusEvent<HTMLInputElement>) => {
		if (onFocus) onFocus({ value: event.target.value, isValid: validateInput(event.target.value).isValid, event });
		setIsFocused(true);
	}

	const handleIconClick = (side: T_IconSide) => (e: any) => {
		e.stopPropagation();
		onIconClick?.(side, e);
	};

	const togglePasswordVisibility = () => {
		setInputType(prevType => prevType === 'password' ? 'text' : 'password');
	};


	const ops = {
		inp: {
			...rest,
			ref: inpRef,
			type: inputType === 'password' ? inputType : 'text',
			placeholder,
			onChange: handleChange,
			onBlur: handleBlur,
			onFocus: handleFocused,
			"data-focus": isFocused,
			autoComplete: 'new-password'
		} as ComponentProps<'input'>,

		wrap: {
			style: {
				width: w,
				...style,
			} as CSSProperties,
			"data-focus": isFocused,
		} as ComponentProps<'div'>,

	}

	return (<>
		<div {...ops.wrap} className={clsx(cls.wrap, className)}>
			<InpHead {...({ label, type, forgot })} />
			<div data-err={(showValidation && isTouched && !validation.isValid)} className={cls.inp}>
				<InpIcons {...({ clear, handleIconClick, value, togglePasswordVisibility, type, inputType, iconL, iconR })}>
					<input {...ops.inp} />
				</InpIcons>
			</div>
			{(showValidation || message) && <InpFoot {...({ message, error, validation, shouldShowValidation, isTouched })} />}
			{type == 'search' && <InpHint {...({ clear, SET_hintVisible, hintVisible, value, setIsTouched, inpRef, isFocused, setter, isRecent, popular, advice })} />}
		</div>
	</>)
}

export default InputText;