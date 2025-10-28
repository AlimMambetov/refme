import { createSlice, PayloadAction } from '@reduxjs/toolkit'


const initialState = {
	data: null,
	loading: false,
	error: null,
	modalOpen: false,
}

const base = createSlice({
	name: 'base',
	initialState,
	reducers: {
		SET_DATA: (state, action) => {
			state.data = action.payload
		},
		CLOSE_MODAL: (state) => {
			state.modalOpen = false
		},
		OPEN_MODAL: (state) => {
			state.modalOpen = true
		},
	}
})

const { actions, reducer } = base


export const { SET_DATA, CLOSE_MODAL, OPEN_MODAL } = actions
export default reducer
