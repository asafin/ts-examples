import * as React from "react";
import { faImage } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export interface Props {
    onClick: () => void
}

export const GetScreenshotBtnComponent : React.FC<Props> = props =>  {

    const componentClass = 'GetScreenshotBtnComponent'

    return (
        <div className={componentClass} title="Сделать скриншот">
            <FontAwesomeIcon icon={faImage} className="getScreenShotBtn" onClick={props.onClick}/>
        </div>
    );
}