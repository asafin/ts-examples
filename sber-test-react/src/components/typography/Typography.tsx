import * as React from "react";
import * as I from './ITypography'

export const TypographyComponent : React.FC<I.Props> = props =>  {
    const componentClass = 'TypographyComponent'

    return (
        <div className={`${componentClass} ${props.variant}`} title={props.title}>
            {props.children}
        </div>
    );
}