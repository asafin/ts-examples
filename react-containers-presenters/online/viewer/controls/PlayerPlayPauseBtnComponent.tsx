import * as React from "react";
import { faPlayCircle, faPauseCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export interface Props {
    isPlay: boolean,
    onClick: () => void
}

export const PlayerPlayPauseBtnComponent : React.FC<Props> = props =>  {

    const componentClass = 'PlayerPlayPauseBtnComponent'

    return (
        <div className={componentClass}>
            <FontAwesomeIcon icon={props.isPlay ? faPlayCircle : faPauseCircle} className="playPauseBtn" onClick={props.onClick}/>
        </div>
    );
}