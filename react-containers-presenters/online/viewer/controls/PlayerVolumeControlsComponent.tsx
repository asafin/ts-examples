import * as React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeUp, faVolumeOff } from '@fortawesome/free-solid-svg-icons';

export interface Props {
    listener: (event: React.ChangeEvent<HTMLInputElement>) => void,
    onClick: () => void,
    volume: number,
    soundOn: boolean
}

export const PlayerVolumeControlsComponent : React.FC<Props> = props =>  {

    const componentClass = 'PlayerVolumeControlsComponent'
    const volumeControlsClass = `volumeControls`

    return (
        <div className={componentClass}>
            <div className={`${componentClass}__soundOnOff`} onClick={props.onClick}>
                <FontAwesomeIcon icon={props.soundOn ? faVolumeUp : faVolumeOff} />
            </div>
            <div className={`${volumeControlsClass} ${componentClass}__volumeControls`}>
                <input type="range" min="0" max="10" value={props.volume} className="slider" onChange={props.listener} />
            </div>            
        </div>
    );
}