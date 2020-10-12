import * as React from "react";
import {Link, NavLink} from "react-router-dom";
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export interface BaseButtonProps {
    title?: string,
    active?: boolean,
    disabled?: boolean 
}

export interface SimpleButtonProps extends BaseButtonProps {
    listener: () => void
}

export interface ActionButtonProps extends SimpleButtonProps {
    primary?: boolean,
    small?: boolean
}

export interface LinkButtonProps extends BaseButtonProps {
    path: string,
    primary?: boolean,
    small?: boolean
}

export const SimpleButton : React.FC<SimpleButtonProps> = props =>  {

    const componentClass = 'SimpleButton'

    const activeCls = props.active ? 'active' : '';
    const disabledCls = props.disabled ? 'disabled' : '';

    return (
        <div className={`${componentClass} ${activeCls} ${disabledCls}`} onClick={props.listener}>
            {props.title}
        </div>
    );

}  


export const LinkButton : React.FC<LinkButtonProps> = props =>  {

    const componentClass = 'LinkButton'

    const disabledCls = props.disabled ? 'disabled' : '';
    const smallCls = props.small ? 'small' : '';
    const primaryCls = props.primary ? 'primary' : '';

    return (
        <div className={`${componentClass} ${disabledCls} ${primaryCls} ${smallCls}`}>
            <NavLink to={props.path} activeClassName="active" exact>{props.title}</NavLink>
        </div>
    );

}   

export const AddIconButton : React.FC<LinkButtonProps> = props =>  {

    const componentClass = "AddIconButton"       

    const activeCls = props.active ? `${componentClass}_active` : '';
    const disabledCls = props.disabled ? `${componentClass}_disabled` : '';

    return (
        <Link to={props.path} className={`${componentClass} ${activeCls} ${disabledCls}`}>
            <FontAwesomeIcon icon={faPlusCircle} className={`${componentClass}__icon`}/>
            <div className={`${componentClass}__text`}>
                {props.title}                  
            </div>   
        </Link>    
    );
}

export const ActionButton : React.FC<ActionButtonProps> = props => {

    const componentClass = "ActionButton" ;

    const activeCls = props.active ? 'active' : '';
    const disabledCls = props.disabled ? 'disabled' : '';
    const primaryCls = props.primary ? 'primary' : '';
    const smallCls = props.small ? 'small' : '';

    const handleClick = () => {
        if (!props.disabled) {
            return props.listener()
        }
    }

    return (
        <div className={`${componentClass} ${activeCls} ${disabledCls} ${primaryCls} ${smallCls}`} onClick={handleClick}>
            {props.title}
        </div>
    );
}