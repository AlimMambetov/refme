'use client'
import { configureStore } from '@reduxjs/toolkit';

// slices
import * as base from './base.slice';
import * as env from './env.slice';


const reducers = {
	base: base.default,
	env: env.default,
};

const actions = {
	...base,
	...env,
	default: ''
};

const store = configureStore({
	reducer: { ...reducers }
})

export default store;

export type RootState = ReturnType<typeof store.getState>;

export {
	reducers,
	actions
};