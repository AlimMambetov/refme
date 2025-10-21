'use client'
import { createContext, useContext, ReactNode, ComponentType } from 'react'
import Icon from './Icon.ui'
import InputText from './InputText'
import Button from './Button'
import InputCode from './InputCode'
import Checkbox from './Checkbox'
import Title from './Title'
import Text from './Text'
import Select from './Select'
import LinkText from './LinkText'
import Tooltip from './Tooltip'
import Chips from './Chips'
import Tag from './Tag'
import Loader from './Loader'



type T_UIComponents = {
	Icon: typeof Icon
	InputText: typeof InputText
	Button: typeof Button
	InputCode: typeof InputCode
	Checkbox: typeof Checkbox
	Title: typeof Title
	Text: typeof Text
	Select: typeof Select
	LinkText: typeof LinkText
	Tooltip: typeof Tooltip
	Chips: typeof Chips
	Tag: typeof Tag
	Loader: typeof Loader
}

const components: T_UIComponents = {
	Icon,
	InputText,
	Button,
	InputCode,
	Checkbox,
	Title,
	Text,
	Select,
	LinkText,
	Tooltip,
	Chips,
	Tag,
	Loader,
}

const UIContext = createContext<T_UIComponents | undefined>(undefined)

type T_UI = {
	children: ReactNode
}

export function UIProvider({ children }: T_UI) {
	return (
		<UIContext.Provider value={components}>
			{children}
		</UIContext.Provider>
	)
}

// 4. Хук для использования UI-компонентов
export function useUI() {
	const context = useContext(UIContext)
	if (context === undefined) {
		throw new Error('useUI must be used within a UIProvider')
	}
	return context
}