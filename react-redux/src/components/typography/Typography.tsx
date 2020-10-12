import * as React from "react";

type TypoVariant = 'p' | 'description' | 'h1-title' | 'h2-title' | 'h3-title';

export interface Props {
    variant: TypoVariant,
    title?: string
}

export const TypographyComponent : React.FC<Props> = props =>  {

    const componentClass = 'TypographyComponent'

    return (
        <div className={`${componentClass} ${props.variant}`} title={props.title}>
            {props.children}
        </div>
    );
}