import * as React from "react";
import { TypographyComponent } from "../../../../../components/typography/Typography";

export interface Props {
    total: number
}

export const EventsLogHeaderComponent : React.FC<Props> = props =>  {

    const componentClass = 'EventsLogHeaderComponent'

    return (
        <div className={componentClass}>
            <TypographyComponent variant="h1-title">
                Журнал событий
            </TypographyComponent>
            <TypographyComponent variant="description">
                {`${props.total} событий`} 
            </TypographyComponent>
        </div>
    );
}