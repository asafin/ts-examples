import * as React from "react"

type InputTypes = 'text' | 'password' | 'email' | 'tel';

interface BaseProps {
    placeholder?: string,
    disabled?: boolean,
    description?: string,
    showDescription?: boolean,
    type?: InputTypes
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export interface InputTextProps extends BaseProps{
    error?: boolean,
    value?: string,
    defaultValue?: string    
}

export interface SearchInputTextProps extends BaseProps{
    listener: () => void,
    onKeyDown?: (event: any) => void,
    value: string
}