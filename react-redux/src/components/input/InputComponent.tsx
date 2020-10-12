import * as React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

export type InputTypes = 'text' | 'password' | 'email' | 'tel';

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

export const InputTextComponent : React.FC<InputTextProps> = props =>  {

    const componentClass = 'InputTextComponent'
    const hasErrorCls = props.error ? `${componentClass}_error` : ''

    const inputType = props.type ? props.type : 'text'

    const hasDescriptionCls = props.showDescription ? `${componentClass}_showDescription` : ''

    const renderDescription = () => {

        if (props.showDescription) {
            return (
                <div className={`${componentClass}__description`}>
                    {props.description ? props.description : ''}
                </div>
            )
        }        
    }

    return (
        <div className={`${componentClass} ${hasErrorCls} ${hasDescriptionCls}`}>
            <input 
                type={inputType} 
                className={`${componentClass}__text-input`} placeholder={props.placeholder ? props.placeholder : ''} 
                value={props.value} 
                onChange={props.onChange} 
                defaultValue={props.defaultValue}
                />   
            {renderDescription()}
        </div>
    );
}

export const SearchInputTextComponent : React.FC<SearchInputTextProps> = props =>  {

    const componentClass = 'InputTextComponent'

    const inputType = props.type ? props.type : 'text'

    const hasDescriptionCls = props.showDescription ? `${componentClass}_showDescription` : ''

    const renderDescription = () => {

        if (props.showDescription) {
            return (
                <div className={`${componentClass}__description`}>
                    {props.description ? props.description : ''}
                </div>
            )
        }        
    }

    return (
        <div className={`${componentClass}  ${hasDescriptionCls}`}>
            <div className={`${componentClass}__wrapper`}>
                <input 
                    type={inputType} 
                    className={`${componentClass}__text-input`} placeholder={props.placeholder ? props.placeholder : ''} 
                    value={props.value} 
                    onChange={props.onChange} 
                    onKeyDown={props.onKeyDown}
                    /> 
                <div className="searchInputIcon">
                    <FontAwesomeIcon icon={faSearch} />
                </div>   
            </div>  
            {renderDescription()}
        </div>
    );
}
