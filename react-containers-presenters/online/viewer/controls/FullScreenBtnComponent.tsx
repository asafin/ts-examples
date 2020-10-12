import * as React from "react";
import { faExpand} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export interface Props {
    onClick: () => void
}

export const FullScreenBtnComponent : React.FC<Props> = props =>  {

    const componentClass = 'FullScreenBtnComponent'

    return (
        <div className={componentClass}>
            <FontAwesomeIcon icon={faExpand} className="fullscreenBtn" onClick={props.onClick}/>
        </div>
    );
}