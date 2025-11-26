'use client'
import React, { useEffect, useRef, useState } from 'react';
import cls from './style.module.scss';
import { useRouter } from 'next/navigation';
import { fetchDataPOST, parseTokenExpiry } from '@/scripts';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { T_store } from '@/types';
import { Button, Icon, InputCode, InputText, InpValidationRule, Text, Title } from '@/components/ui';

export const AuthBlock = (props: any) => {
	const router = useRouter();
	const { API_URL } = useSelector((state: T_store) => state.env)
	const [formData, setFormData] = useState<any>({
		email: ['', false],
		password: ['', false],
	});
	const [formValid, SET_formValid] = useState(true);
	const [type, SET_type] = useState<'sign-in' | 'sign-up' | 'code' | 'username' | 'forgot' | 'reset-pass' | 'new-pass'>('sign-in');
	const [errInpApi, SET_errInpApi] = useState('');
	const timeoutRef = useRef<any>(null);
	const [code, setCode] = useState<any>(null)


	useEffect(() => {
		let result = true;
		Object.values(formData).forEach((value: any) => !value[1] ? (result = false) : null);
		SET_formValid(result)
	}, [formData])

	const validations = {
		email: [
			{ required: true, email: true, }
		] as InpValidationRule[],
		password: [
			{ required: true, minLength: 6 }
		] as InpValidationRule[]
	}


	const setTokens = ({ refreshToken = '', accessToken = '' }: any) => {
		const accessExpiry = parseTokenExpiry('15m');
		const refreshExpiry = parseTokenExpiry('30d');
		Cookies.set('access_token', accessToken, {
			expires: accessExpiry, // 1 день
			secure: true,
			sameSite: 'strict'
		});

		Cookies.set('refresh_token', refreshToken, {
			expires: refreshExpiry, // 7 дней
			secure: true,
			sameSite: 'strict'
		});
	}

	const sendReq = async (e: any) => {
		e.preventDefault();
		clearTimeout(timeoutRef.current);
		SET_errInpApi('');
		const password = formData.password[0].trim();
		const email = formData.email[0].trim();

		if (type == 'forgot') {
			await fetch(`${API_URL}/api/auth/forgot-password`, fetchDataPOST({ email }))

			SET_type('reset-pass');
			return;
		}

		if (type == 'reset-pass') {
			return
		}
		if (type == 'new-pass') {
			const newPassword = formData.password[0];
			const fetchData = await fetch(`${API_URL}/api/auth/verify-code`, fetchDataPOST({ email, code, newPassword }));
			const data = await fetchData.json();

			console.log(data)

			SET_type('sign-in')
			return
		}

		if (type == 'sign-in') {
			const fetchData = await fetch(`${API_URL}/api/auth/login`, fetchDataPOST({ email, password }))
			const { accessToken, refreshToken } = await fetchData.json();
			if (fetchData?.ok) {
				setTokens({ accessToken, refreshToken })
				router.push('/')
			} else {
				SET_errInpApi('Wrong login or password');
				timeoutRef.current = setTimeout(() => {
					SET_errInpApi('')
				}, 3000);
			}

			return;
		};
		if (type == 'username') return router.push('/');
		if (type == 'sign-up') {
			const fetchData = await fetch(`${API_URL}/api/auth/register`, fetchDataPOST({ email, password }))
			const res = await fetchData.json();
			SET_type('code');
			return
		}
	}

	const changeInp = (inp: any) => {
		let name = inp.event.target.name;
		setFormData((prev: any) => ({ ...prev, [name]: [inp.value, inp.isValid] }))
	}

	const checkValid = async (code: any) => {
		try {
			const email = formData.email[0];
			if (type == 'reset-pass') {

				const fetchData = await fetch(`${API_URL}/api/auth/verify-code-only`, fetchDataPOST({ email, code }))
				const { success } = await fetchData.json();
				if (success) SET_type('new-pass')
				setCode(code);
				return fetchData?.ok
			}
			else {
				const fetchData = await fetch(`${API_URL}/api/auth/verify-code`, fetchDataPOST({ email, code }))
				const { accessToken, refreshToken } = await fetchData.json();
				setCode(code);
				location.pathname = '/'

				// if (fetchData?.ok) {
				// 	setTokens({ accessToken, refreshToken })
				// 	SET_type('username')
				// 	return true
				// }
				return fetchData?.ok
			}
		} catch (error) {
			return false
		}
	};

	const titleObj = {
		"sign-in": "Welcome to RefMe",
		"sign-up": "Create your RefMe account",
		"code": "Enter verification code",
		"username": "Enter your Username",
		"forgot": "Reset your password",
		"reset-pass": "Enter verification code",
		"new-pass": "Set a new password",
	} as any;

	const textObj = {
		"sign-in": "or log in with email",
		"sign-up": "or create account with email",
		"code": <>We`ve sent a code to <b>{formData?.email}</b></>,
		"reset-pass": <>We`ve sent a code to <b>{formData?.email}</b></>,
		"username": "Your username will be displayed when you post links",
		"forgot": "Enter the email address to which your account is registered",
	} as any;

	const hintObj = {
		"sign-in": <><p>Don't have an account?</p> <b onClick={() => SET_type('sign-up')}>Sign up</b></>,
		"sign-up": <><p>Already have an account?</p> <b onClick={() => SET_type('sign-in')}>Log in</b></>,
		"code": <><p>Didn't get a code even after resending?</p> <b>Contact support</b></>,
		"reset-pass": <><p>Didn't get a code even after resending?</p> <b>Contact support</b></>,
		// "username": <><p>Don't have an account?</p> <b>Sign up</b></>,
	} as any;

	const submitObj = {
		"sign-in": "Log in",
		"sign-up": "Create new account",
		"code": "Resend a code",
		"username": "Save",
		"forgot": "Reset password",
		"reset-pass": "Resend a code",
		"new-pass": "Save",
	} as any;


	const authGoogle = async () => {
		router.push(`${API_URL}/api/auth/google`)
	}

	const onForgot = () => {
		SET_type('forgot')
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
				{type == 'code' && <div className={cls.auth__back}>
					<Button onClick={() => SET_type('sign-up')} size='small' variant='secondary' className={cls.btn}><Icon name='back' /> Change email</Button>
				</div>}
				{type == 'reset-pass' && <div className={cls.auth__back}>
					<Button onClick={() => SET_type('forgot')} size='small' variant='secondary' className={cls.btn}><Icon name='back' /> Change email</Button>
				</div>}
				{type == 'forgot' && <div className={cls.auth__back}>
					<Button onClick={() => SET_type('sign-in')} size='small' variant='secondary' className={cls.btn}><Icon name='back' /> Back</Button>
				</div>}
				<div className={cls.auth__head}>
					<Title className={cls.auth__title} level={2}>{titleObj[type]}</Title>
					{(['code', 'username', 'forgot', 'reset-pass'].includes(type)) && <Text className={cls.text}>{textObj[type]}</Text>}
				</div>
				{(['sign-up', 'sign-in'].includes(type)) && <div className={cls.auth__btns}>
					<Button onClick={authGoogle} className={cls.btn} variant='primary'>Log in with Google <Icon name='google-fill' /></Button>
					{/* <Button className={cls.btn} variant='primary'>Log in with Apple <Icon name='apple' /></Button> */}
				</div>}
				<form onSubmit={sendReq} className={cls.form}>
					{(['sign-up', 'sign-in'].includes(type)) && <div className={cls.form__legend}>{textObj[type]}</div>}
					{(['reset-pass', 'code'].includes(type)) && <InputCode className={cls.code} checkValid={checkValid} />}
					{type == 'username' && <div className={cls.username}>
						<InputText w='100%' label='Username' />
						<p className={cls.username__desc}>You can use a–z, 0-9 and _ <br />The minimum length is 5 simbols</p>
					</div>}
					{(['sign-up', 'sign-in'].includes(type)) && <>
						<InputText error={errInpApi} w='100%' value={formData.email[0]} onChange={changeInp} name='email' validationRules={validations.email} label='Email' />
						<InputText w='100%' value={formData.password[0]} forgot={type == 'sign-in' ? <div className='forgot' onClick={onForgot}>Forgot</div> : ''} name='password' onChange={changeInp} validationRules={validations.password} type='password' label={type == 'forgot' ? 'Enter new password' : 'Password'} />
					</>}
					{type == 'new-pass' && <>
						<InputText w='100%' value={formData.password[0]} name='password' onChange={changeInp} validationRules={validations.password} type='password' label={'Enter new password'} />
						<InputText w='100%' name='password-confirm' validationRules={[{ custom: (value) => value == formData.password[0], message: 'Passwords do not match' }]} onChange={changeInp} type='password' label='Confirm password' />
					</>
					}
					{(['forgot'].includes(type)) && <InputText error={errInpApi} w='100%' value={formData.email[0]} onChange={changeInp} name='email' validationRules={validations.email} label='Email' />}
					{type == 'sign-up' && <InputText w='100%' name='password-confirm' validationRules={[{ custom: (value) => value == formData.password[0], message: 'Passwords do not match' }]} onChange={changeInp} type='password' label='Confirm password' />}
					<Button disabled={['sign-up', 'sign-in'].includes(type) && !formValid} type='submit' variant={['sign-up', 'sign-in'].includes(type) ? 'secondary' : 'primary'} w='100%'>{submitObj[type]}</Button>
				</form>
				<div className={cls.auth__hint}>{hintObj[type]}</div>
				<div className={cls.auth__foot}>
					{(['sign-up', 'sign-in'].includes(type)) && <div className={cls.form__legend}>{textObj[type]}</div>}
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