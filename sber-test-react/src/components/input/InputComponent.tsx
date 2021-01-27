import * as React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import * as I from './IInput'

export const InputTextComponent : React.FC<I.InputTextProps> = props =>  {

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
                className={`${componentClass}__text-input`} 
                placeholder={props.placeholder ? props.placeholder : ''} 
                value={props.value} 
                onChange={props.onChange} 
                defaultValue={props.defaultValue}
                disabled={props.disabled}
                />   
            {renderDescription()}
        </div>
    );
}

export const SearchInputTextComponent : React.FC<I.SearchInputTextProps> = props =>  {

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
                    className={`${componentClass}__text-input`} 
                    placeholder={props.placeholder ? props.placeholder : ''} 
                    value={props.value} 
                    onChange={props.onChange} 
                    onKeyDown={props.onKeyDown}
                    disabled={props.disabled}
                    /> 
                <div className="searchInputIcon">
                    <FontAwesomeIcon icon={faSearch} onClick={props.listener} />
                </div>   
            </div>  
            {renderDescription()}
        </div>
    );
}
