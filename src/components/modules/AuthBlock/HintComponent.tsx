'use client'
import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { T_formType } from '.';



export const useResendTimer = (initialTime: number = 60) => {
	const [finishTimeout, setFinishTimeout] = useState(false);
	const [time, setTime] = useState(initialTime);

	useEffect(() => {
		if (time > 0) {
			const timer = setTimeout(() => setTime(time - 1), 1000);
			return () => clearTimeout(timer);
		} else {
			setFinishTimeout(true);
		}
	}, [time]);

	const reset = useCallback(() => {
		setFinishTimeout(false);
		setTime(initialTime);
	}, [initialTime]);

	return { finishTimeout, time, reset };
};


export const HintComponent = memo(({
	type,
	typeSetter,
	resendCode
}: {
	type: T_formType,
	typeSetter: (newType: T_formType) => void,
	resendCode: () => void
}) => {
	const { finishTimeout, time, reset } = useResendTimer(60);

	const resend = useCallback(() => {
		reset();
		resendCode();
	}, [reset, resendCode]);

	// Рендерим в зависимости от type
	switch (type) {
		case 'sign-in':
			return (<>
				<p>Don't have an account?</p>
				<b onClick={() => typeSetter('sign-up')}>Sign up</b>
			</>);

		case 'sign-up':
			return (<>
				<p>Already have an account?</p>
				<b onClick={() => typeSetter('sign-in')}>Log in</b>
			</>);

		case 'code-register':
		case 'code-password':
			return (<>
				<p>Don't get a code?</p> {finishTimeout ? (
					<b onClick={resend}>Resend</b>
				) : (
					<p> <span>Resend in</span>  <span data-b>00:{time.toString().padStart(2, '0')}</span></p>
				)}
			</>);

		default:
			return null;
	}
});