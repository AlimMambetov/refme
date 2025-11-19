'use client'
import React, { useState, useRef, useEffect, KeyboardEvent, ClipboardEvent } from 'react';
import cls from './style.module.scss';

interface VerificationCodeProps {
	length?: number;
	onComplete?: (code: string) => void;
	autoFocus?: boolean;
	className?: string;
	checkValid?: (code: string) => Promise<boolean>;
}


export const InputCode: React.FC<VerificationCodeProps> = ({
	length = 4,
	onComplete,
	autoFocus = true,
	checkValid,
	className,
}) => {
	const [code, setCode] = useState<string[]>(Array(length).fill(''));
	const [isChecking, setIsChecking] = useState(false);
	const [isValid, setIsValid] = useState<boolean | null>(null);
	const inputRefs = useRef<HTMLInputElement[]>([]);

	useEffect(() => {
		if (autoFocus && inputRefs.current[0]) {
			inputRefs.current[0].focus();
		}
	}, [autoFocus]);


	useEffect(() => {
		const completeCode = code.join('');
		if (completeCode.length === length) {
			handleCodeComplete(completeCode);
		}
	}, [code, length]);

	const handleCodeComplete = async (completeCode: string) => {
		if (onComplete) {
			onComplete(completeCode);
		}

		if (checkValid) {
			setIsChecking(true);
			setIsValid(null);

			try {
				const isValidCode = await checkValid(completeCode);
				setIsValid(isValidCode);

				if (!isValidCode) {
					// Сброс кода при неверной проверке
					setTimeout(() => {
						setCode(Array(length).fill(''));
						setIsValid(null);
						inputRefs.current[0]?.focus();
					}, 2000);
				}
			} catch (error) {
				console.error('Ошибка проверки кода:', error);
				setIsValid(false);

				setTimeout(() => {
					setCode(Array(length).fill(''));
					setIsValid(null);
					inputRefs.current[0]?.focus();
				}, 2000);
			} finally {
				setIsChecking(false);
			}
		}
	};

	const handleChange = (index: number, value: string) => {
		if (!/^\d*$/.test(value)) return;

		const newCode = [...code];
		newCode[index] = value;
		setCode(newCode);

		// Автопереход к следующему полю
		if (value !== '' && index < length - 1) {
			inputRefs.current[index + 1]?.focus();
		}
	};

	const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Backspace') {
			if (code[index] === '' && index > 0) {
				inputRefs.current[index - 1]?.focus();
			} else {
				const newCode = [...code];
				newCode[index] = '';
				setCode(newCode);
			}
			e.preventDefault();
		} else if (e.key === 'ArrowLeft' && index > 0) {
			inputRefs.current[index - 1]?.focus();
			e.preventDefault();
		} else if (e.key === 'ArrowRight' && index < length - 1) {
			inputRefs.current[index + 1]?.focus();
			e.preventDefault();
		}
	};

	const handlePaste = (e: ClipboardEvent<HTMLDivElement>) => {
		e.preventDefault();
		const pastedData = e.clipboardData.getData('text').slice(0, length);

		if (/^\d+$/.test(pastedData)) {
			const newCode = pastedData.split('');
			const filledCode = [...newCode, ...Array(length - newCode.length).fill('')];
			setCode(filledCode);

			const lastFilledIndex = Math.min(pastedData.length - 1, length - 1);
			inputRefs.current[lastFilledIndex]?.focus();
		}
	};

	const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
		e.target.select();
	};

	const isCodeComplete = code.every(digit => digit !== '');


	return (
		<div data-valid={isValid} className={`${cls.container} ${className || ''}`}>
			<div
				className={cls.inputsWrapper}
				onPaste={handlePaste}
				data-checking={isChecking}
				data-valid={isValid === true}
				data-invalid={isValid === false}
			>
				{code.map((digit, index) => (
					<div
						key={index}
						className={cls.inpBox}
					>
						<input
							ref={(el) => {
								if (el) {
									inputRefs.current[index] = el;
								}
							}}
							type="text"
							inputMode="numeric"
							maxLength={1}
							value={digit}
							onChange={(e) => handleChange(index, e.target.value)}
							onKeyDown={(e) => handleKeyDown(index, e)}
							onFocus={handleFocus}
							className={cls.input}
							data-filled={digit !== ''}
							data-active={index === code.findIndex(item => item === '')}
							autoComplete='new-password'
							placeholder=''
						/>
					</div>
				))}
			</div>

			{/* {isCodeComplete && (
				<div className={cls.completeMessage}>
					Код полностью введен: <strong>{code.join('')}</strong>
				</div>
			)} */}
		</div>
	);
}

export default InputCode;

