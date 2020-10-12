import * as React from "react";
import { ActionButton } from "../../components/buttons/Buttons";
import CloseIcon from '@material-ui/icons/Close';

export interface Props {
    inProgress: boolean,
    listener: () => void,
    message: string,
    onClose: () => void
}

export const DemoMessageComponentView: React.FC<Props> = props => {

    const {inProgress, listener, message} = props

    const componentClass = "DemoMessageComponentView"

    return (
        <div className={componentClass}>
            <div className={`${componentClass}__header`}>
                <div className={`${componentClass}__headerIcon`} onClick={props.onClose}>
                    <CloseIcon fontSize="default" />
                </div>
            </div>
            <div className={`${componentClass}__content`}>
                <div dangerouslySetInnerHTML={{__html: message}} />
            </div>   
            <div className={`${componentClass}__actions`}>
                <ActionButton 
                    title="Продолжить"
                    listener={listener}
                    disabled={inProgress}
                    primary={true} 
                /> 
            </div>                      
        </div>
    );
}

