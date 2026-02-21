import { ReactNode } from "react";
import { T_formType } from ".";

export const textTitleObj = {
	"sign-in": "Welcome to RefMe",
	"sign-up": "Create your RefMe account",
	"username": "Enter your Username",
	"new-password": "Set a new password",
	"code-password": "Enter verification code",
	"code-register": "Enter verification code",
} as Record<T_formType, string | ReactNode>;


export const textSubmitObj = {
	"sign-in": "Log in",
	"sign-up": "Create new account",
	"username": "Save",
	"new-password": "Save",
	"code-register": "Confirm",
	"code-password": "Confirm",
} as Record<T_formType, string | ReactNode>;


export const getTextObj = (email: string) => ({
	"sign-in": "or log in with email",
	"sign-up": "or create account with email",
	"username": "Your username will be displayed when you post links",
	"code-password": <>We`ve sent a code to <b>{email}</b></>,
	"code-register": <>We`ve sent a code to <b>{email}</b></>,
}) as Record<T_formType, string | ReactNode>;


