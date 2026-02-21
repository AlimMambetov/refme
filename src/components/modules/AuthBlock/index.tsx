'use client'
import React, { useEffect, useRef, useState } from 'react';
import cls from './style.module.scss';
import { useRouter } from 'next/navigation';
import { createStateUpdater, fetchDataPOST, parseTokenExpiry, setTokens } from '@/scripts';
import { useSelector } from 'react-redux';
import { T_store } from '@/types';
import { Button, Icon, InputCode, InputText, InpValidationRule, Text, Title } from '@/components/ui';
import { getTextObj, textSubmitObj, textTitleObj } from './textContent';
import { HintComponent } from './HintComponent';



export type T_FormStatus = Record<'isLoad' | 'isValid' | 'isError', boolean>;
export type T_FormData = Record<'email' | 'password' | 'username' | 'code', string>;
export type T_FormValidData = Record<'email' | 'password' | 'username', boolean>;
export type T_FormError = Record<'email' | 'password' | 'username' | 'code', string | null>;
export type T_formType = 'sign-in' | 'sign-up' | 'code-register' | 'code-password' | 'username' | 'new-password';

const defaultFormDataValue = {
	email: '',
	password: '',
	username: '',
	code: '',
}
const defaultFormValidDataValue = {
	email: false,
	password: false,
	username: false,
}
const defaultFormErrorValue = {
	email: null,
	password: null,
	username: null,
	code: null,
}
const defaultFormStatusValue = {
	isLoad: false,
	isValid: true,
	isError: false,
}




export const AuthBlock = (props: any) => {
	const router = useRouter();
	const { API_URL } = useSelector((state: T_store) => state.env)
	const [type, typeSetter] = useState<T_formType>('sign-in');
	const [formData, formDataSetter] = useState<T_FormData>(defaultFormDataValue);
	const [formValidData, formValidDataSetter] = useState<T_FormValidData>(defaultFormValidDataValue);
	const [formError, formErrorSetter] = useState<T_FormError>(defaultFormErrorValue);
	const [formStatus, formStatusSetter] = useState<T_FormStatus>(defaultFormStatusValue);
	const [matchConfirmPassword, matchConfirmPasswordSetter] = useState(false);
	// --------------------------------------------
	const { email, password, username, code } = formData;
	const { isLoad, isValid, isError } = formStatus;
	const {
		email: emailError,
		password: passwordError,
		username: usernameError,
		code: codeError
	} = formError;
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);
	// ---------------------------------------------
	const setFormData = createStateUpdater(formDataSetter);
	const setFormStatus = createStateUpdater(formStatusSetter);
	const setFormError = createStateUpdater(formErrorSetter);
	const setFormValid = createStateUpdater(formValidDataSetter);
	// setFormData('email', 'test@example.com'); // ✅ обновит одно поле
	// setFormData({ email: 'test@example.com', password: '123' }); // ✅ обновит несколько
	// ---------------------------------------------
	const clearFormData = () => setFormData(defaultFormDataValue);
	const clearFormStatus = () => setFormStatus(defaultFormStatusValue);
	const clearErrors = () => setFormError(defaultFormErrorValue);


	useEffect(() => {
		let valid = true;

		function startVaild(arrKeys: Array<keyof T_FormValidData | 'confirm-password'>) {
			for (let key of arrKeys) {
				if (key === 'confirm-password') {
					if (!matchConfirmPassword) {
						valid = false;
						break;
					}
					continue;
				}

				if (!formValidData[key]) {
					valid = false;
					break;
				}
			}
		}

		const validKeys = {
			'sign-in': ['email', 'password'],
			'sign-up': ['email', 'password', 'confirm-password'],
			'username': ['username'],
			'new-password': ['password', 'confirm-password'],
			'code-register': [],
			'code-password': [],
		};

		startVaild(validKeys[type] as Array<keyof T_FormValidData>);

		setFormStatus('isValid', valid);
	}, [formValidData, type, matchConfirmPassword])




	const resendCode = async () => {
		const fetchData = await fetch(`${API_URL}/api/auth/send-code?email=${email}`);
		const res = await fetchData.json();
		if (res.success) {
			setFormData('code', '')
			return;
		}
	}

	const checkValidationCode = async (code: string) => {
		const fetchData = await fetch(`${API_URL}/api/auth/verify-code?email=${email}&code=${code}`);
		const res = await fetchData.json();
		if (res.success) {
			return true;
		}
		return false;
	}

	const changeInp = (inp: any) => {
		let name = inp.event.target.name;
		let value = inp.event.target.value;
		setFormData(name, value)
	}


	const forgotAction = async () => {
		try {
			const fetchFreeEmail = await fetch(`${API_URL}/api/auth/free-email?email=${email}`);
			const resFreeEmail = await fetchFreeEmail.json();
			if (resFreeEmail.success) return setFormError('email', 'no such email exists');
			const fetchCode = await fetch(`${API_URL}/api/auth/send-code?email=${email}`);
			const resCode = await fetchCode.json();
			if (!resCode.success) return setFormError('email', 'This field is required');
			if (resCode.success) typeSetter('code-password');
		} catch (error) {
			alert(error)
		}
	}


	const inputOps = {
		username: {
			name: 'username',
			label: 'Username',
			isValid: (valid: boolean) => setFormValid('username', valid),
			error: usernameError,
			validationRules: [{ minLength: 2, message: 'Username must be at least 2 characters long' }, { required: true }],
			value: username,
			onChange: changeInp,
			onFocus: clearErrors
		},
		email: {
			name: 'email',
			label: 'Email',
			isValid: (valid: boolean) => setFormValid('email', valid),
			validationRules: [{ email: true, message: 'Enter the correct email' }, { required: true }],
			value: email,
			error: emailError,
			onChange: changeInp,
			onFocus: clearErrors
		},
		password: {
			name: 'password',
			label: type == 'new-password' ? 'Enter new password' : 'Password',
			value: password,
			error: passwordError,
			isValid: (valid: boolean) => setFormValid('password', valid),
			validationRules: [{ minLength: 6, message: 'Password must be at least 6 characters long' }, { required: true }],
			forgot: type == 'sign-in' ? <div className='forgot' onClick={forgotAction}>Forgot</div> : '',
			onChange: changeInp,
			type: 'password',
			onFocus: clearErrors
		},
		confirmPassword: {
			name: 'password-confirm',
			label: 'Confirm password',
			isValid: (valid: boolean) => matchConfirmPasswordSetter(valid),
			validationRules: [{ custom: (value: any) => value == password, message: 'Passwords do not match' }, { required: true }],
			onChange: changeInp,
			type: 'password',
			onFocus: clearErrors
		}
	} as any;


	const sendReq = async (e: any) => {
		e.preventDefault();
		if (!isValid) return console.log('valid err');
		clearErrors();
		setFormStatus('isLoad', true);


		const handlers = {
			'sign-in': async () => {
				try {
					const fetchData = await fetch(`${API_URL}/api/auth/login`, fetchDataPOST({ email, password }));
					const res = await fetchData.json();
					if (res.success) {
						setTokens(res.tokens)
						router.push('/')
						return;
					}

					if (res.error == "Validation error") {
						res.details.forEach(({ field, message }: any) => {
							setFormError(field, message)
						});
					}
					if (res.error == "Invalid password") setFormError('password', 'Invalid password');
					if (res.error == "User not found") setFormError('email', 'User not found');
				} catch (error) {
					alert(error)
				}
			},
			'sign-up': async () => {
				try {
					const fetchFreeEmail = await fetch(`${API_URL}/api/auth/free-email?email=${email}`);
					const resFreeEmail = await fetchFreeEmail.json();
					if (!resFreeEmail.success) {
						setFormError('email', resFreeEmail.message);
						return;
					}
					const fetchData = await fetch(`${API_URL}/api/auth/send-code?email=${email}`);
					const res = await fetchData.json();
					if (res.success) typeSetter('code-register');

				} catch (error) {
					alert(error)
				}
			},
			'username': async () => {
				try {
					const fetchFreeUsername = await fetch(`${API_URL}/api/auth/free-username?username=${username}`);
					const resFreeUsername = await fetchFreeUsername.json();
					if (!resFreeUsername.success) {
						setFormError('username', resFreeUsername.message);
						return;
					}
					const fetchData = await fetch(`${API_URL}/api/auth/register`, fetchDataPOST({ email, password, username, code }));
					const res = await fetchData.json();
					if (res.success) {
						setTokens(res.tokens)
						router.push('/')
						return;
					}
				} catch (error) {
					alert(error)
				}
			},
			'new-password': async () => {
				const fetchData = await fetch(`${API_URL}/api/auth/forgot-password`, fetchDataPOST({ email, password, code }));
				const res = await fetchData.json();
				if (res.success) {
					typeSetter('sign-in');
					alert(res.message);
					return;
				};
				if (res.error == "Validation error") {
					res.details.forEach(({ field, message }: any) => {
						setFormError(field, message)
					});
				}
			},
			'code-register': async () => {
				const isValid = await checkValidationCode(code);
				if (isValid) return typeSetter('username');
				setFormError('code', 'Your code is invalid or has expired');
			},
			'code-password': async () => {
				const isValid = await checkValidationCode(code);
				if (isValid) return typeSetter('new-password');
				setFormError('code', 'Your code is invalid or has expired');
			},
		};

		const handler = handlers[type];
		if (handler) {
			await handler();
		} else {
			console.warn(`Unknown type: ${type}`);
		}

		setFormStatus('isLoad', false);
	}



	const authGoogle = async () => {
		router.push(`${API_URL}/api/auth/google`)
	}


	return (<>
		<div className={cls.wrap}>
			<div className={cls.preview}>
				<div className={cls.preview__desc}>
					<span>2025 ©</span>
					<p>All rights reserved</p>
				</div>

				<Icon name='full-logo' />

				<img src="/images/refme-preview.png" alt="preview" />

			</div>
			<div className={cls.auth}>
				{type == 'code-register' && <div className={cls.auth__back}>
					<Button onClick={() => typeSetter('sign-up')} size='small' variant='secondary' className={cls.btn}><Icon name='back' /> Change email</Button>
				</div>}
				<div className={cls.auth__head}>
					<Title className={cls.auth__title} level={2}>{textTitleObj[type]}</Title>
					{(['code-register', 'code-password', 'username'].includes(type)) && <Text className={cls.text}>{getTextObj(email)[type]}</Text>}
				</div>
				{(['sign-up', 'sign-in'].includes(type)) && <div className={cls.auth__btns}>
					<Button onClick={authGoogle} className={cls.btn} variant='primary'>Log in with Google <Icon name='google-fill' /></Button>
					{/* <Button className={cls.btn} variant='primary'>Log in with Apple <Icon name='apple' /></Button> */}
				</div>}
				<form onSubmit={sendReq} className={cls.form}>
					{(['sign-up', 'sign-in'].includes(type)) && <div className={cls.form__legend}>{getTextObj(email)[type]}</div>}
					{(['code-register', 'code-password'].includes(type)) &&
						<>
							<InputCode onChange={clearErrors} isError={codeError ? true : false} onComplete={(code) => setFormData('code', code)} className={cls.code} />
							<div className={cls.error}>{codeError}</div>
						</>}
					{type == 'username' && <div className={cls.username}>
						<InputText w='100%' {...inputOps.username} />
						<p className={cls.username__desc}>You can use a–z, 0-9 and _ <br />The minimum length is 5 simbols</p>
					</div>}
					{(['sign-up', 'sign-in'].includes(type)) && <>
						<InputText w='100%' {...inputOps.email} />
						<InputText w='100%' {...inputOps.password} />
					</>}
					{type == 'new-password' && <>
						<InputText w='100%' {...inputOps.password} />
						<InputText w='100%' {...inputOps.confirmPassword} />
					</>
					}
					{type == 'sign-up' && <InputText w='100%' {...inputOps.confirmPassword} />}
					<Button type='submit' disabled={isLoad} variant={['sign-up', 'sign-in'].includes(type) ? 'secondary' : 'primary'} w='100%'>{textSubmitObj[type]}</Button>
				</form>
				<div className={cls.auth__hint}>
					<HintComponent {...({ type, typeSetter, resendCode })} />
				</div>
				<div className={cls.auth__foot}>
					{(['sign-up', 'sign-in'].includes(type)) && <div className={cls.form__legend}>{getTextObj(email)[type]}</div>}
					{(['sign-up', 'sign-in'].includes(type)) && <div className={cls.auth__btns}>
						<Button className={cls.btn} variant='primary'>Google <Icon name='google-fill' /></Button>
						{/* <Button className={cls.btn} variant='primary'>Apple <Icon name='apple' /></Button> */}
					</div>}
					<div className={cls.previewInfo}>
						<div className={cls.previewInfo__desc}>
							<span>2025 ©</span>
							<p>All rights reserved</p>
						</div>
						<Icon name='full-logo' />
					</div>
				</div>
			</div>
		</div>
	</>)
}

export default AuthBlock;