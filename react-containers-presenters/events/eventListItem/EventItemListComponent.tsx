import * as React from "react";
import { faMale} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as util from "../../../../../utils";
import { CameraEventRenderModel } from "../../../../../codebase/CameraEventRenderModel";

export interface Props {
    event: CameraEventRenderModel,
    listener: (recordId: number) => void,
    isSelected: boolean
}



export const EventItemListComponent : React.FC<Props> = props =>  {

    const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

    window.addEventListener('resize', () => setWindowWidth(window.innerWidth)); 

    const isSelected = props.isSelected ? 'eventCard_selected' : '';

    const renderTimeDate = () => {
        if (windowWidth > 1024) {
            return util.renderLocaleDateTimeString(props.event.timestamp)
        }
        else {
            return util.renderDateHoursMinutesSeconds(props.event.timestamp);
        }
    }

    return (
        <div className={`eventCard eventCard_list ${isSelected}`} 
            onClick={() => props.listener(props.event.recordId)}
            id={`item-${props.event.recordId}`}
            >
            <div className="eventCard__icon">
                <FontAwesomeIcon icon={faMale} />
            </div>
            <div className="eventCard__description">
                <div className="eventCard__description-main">
                    <div className="eventCard__description-title">{props.event.serviceName}</div>
                    <div className="eventCard__description-camera">{props.event.cameraName}</div>
                </div>                
                <div className="eventCard__description-date">{renderTimeDate()}</div>
            </div>
        </div>
    );
}