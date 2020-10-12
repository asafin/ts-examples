import * as React from "react";
import * as mui from "@material-ui/core";
import { ActionButton } from "../../components/buttons/Buttons";

export interface Props {
    inProgress: boolean,
    listener: () => void,
    message: string
}

export const  OfferMessageComponentView : React.FC<Props> = props => {

    const componentClass = "OfferMessageComponentView"

    const {inProgress, listener, message} = props

    return (
        <div className={componentClass}>
            <div className={`${componentClass}__content`}>
                <div dangerouslySetInnerHTML={{__html: message}} />
            </div>
            <div className={`${componentClass}__actions`}>
                <ActionButton 
                    title="Принять"
                    listener={listener}
                    disabled={inProgress}
                    primary={true} 
                /> 
            </div>                         
        </div>
    );
    

}

