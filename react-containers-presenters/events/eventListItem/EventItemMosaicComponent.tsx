import * as React from "react";
import { IconMessagePillComponent } from "../../../../../components/messagePill/IconMessagePillComponent";
import { faVideo, faClock} from '@fortawesome/free-solid-svg-icons';
import * as utils from "../../../../../utils";
import { CameraEventRenderModel } from "../../../../../codebase/CameraEventRenderModel";

export interface Props {
    event: CameraEventRenderModel,
    listener: (recordId: number) => void,
    isSelected: boolean,
    height: number
}

export const EventItemMosaicComponent : React.FC<Props> = props =>  {

    const isSelected = props.isSelected ? 'eventCard_selected' : '';

    const renderImage = () => {
        if (props.event.imageUrl && props.event.imageUrl.length > 0) {
            return <img src={props.event.imageUrl} />
        }
    }

    return (
        <div className={`eventCard eventCard_mosaic ${isSelected}`}
            onClick={() => props.listener(props.event.recordId)}
            id={`item-${props.event.recordId}`}
            style={{height: props.height}}
        >
            <div className="eventCard__image">
                {
                    renderImage()
                }
            </div>
            <div className="eventCard__info">
                <IconMessagePillComponent type='info' label={props.event.cameraName} icon={faVideo} large={true}/>
            </div>
            <div className="eventCard__description">
                <div className="eventCard__name">
                    {props.event.serviceName}
                </div>
                <div className="eventCard__date">
                    <span className="date">{utils.renderLocaleDateString(props.event.timestamp)},</span> 
                    <span className="time">{utils.renderDateHoursMinutesSeconds(props.event.timestamp)}</span>
                </div>
            </div>
        </div>
    );
}