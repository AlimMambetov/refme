'use client';
import { ReactNode } from 'react';
import { reduxProvider } from './index';
import callOpsProvider from './CallOpsProvider';
import { LayoutProvider } from './LayoutProvider';

const providers = [
	callOpsProvider,
	LayoutProvider,
	reduxProvider,
];

export const AppProviders = ({ children }: { children?: ReactNode }) => {
	return providers.reduce((acc, Provider) => {
		return <Provider>{acc}</Provider>;
	}, children);
};

export default AppProviders;