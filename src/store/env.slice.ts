import { createSlice, PayloadAction } from '@reduxjs/toolkit'


const initialState = {
	API_URL: 'http://91.198.220.107:3030',
	// API_URL: 'http://localhost:3030'
}

const base = createSlice({
	name: 'base',
	initialState,
	reducers: {
		SET_ENV: (state, action) => {
			state = action.payload
		}
	}
})

const { actions, reducer } = base


export const { SET_ENV } = actions
export default reducer
