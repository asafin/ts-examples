import * as React from "react";
import { CameraEventRenderModel } from "../../../../../../codebase/CameraEventRenderModel";
import { MessagePillComponent } from "../../../../../../components/messagePill/MessagePillComponent";

export interface Props {
    event: CameraEventRenderModel,
    listener: (recordId: number) => void,
    isSelected: boolean,
    height: number,
    width: number
}

export const EventsListItemComponent : React.FC<Props> = props =>  {

    const isSelected = props.isSelected ? 'selected' : '';

    const componentClass = 'EventsListItemComponent'

    const renderImage = () => {
        if (props.event.imageUrl && props.event.imageUrl.length > 0) {
            return <img src={props.event.imageUrl} title={`${props.event.serviceName}`} />
        }
    }

    return (
        <div className={`${componentClass} ${isSelected}`}
            onClick={() => props.listener(props.event.recordId)}
            id={`item-${props.event.recordId}`}
            style={{height: props.height, width: props.width}}
        >
            <div className={`${componentClass}__image`}>
                {
                    renderImage()
                }
            </div>
            <div className={`${componentClass}__info`}>
                <MessagePillComponent type='info' label={props.event.serviceName} />
            </div>
        </div>
    );
}