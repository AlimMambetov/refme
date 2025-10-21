'use client'
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions } from '@/store';

const allActions: any = { ...actions };

export const useActions = () => {
	const dispatch = useDispatch();

	return bindActionCreators(allActions, dispatch);
};

export default useActions;