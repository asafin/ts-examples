import * as React from "react";
import PlayerComponent from "../../components/player/PlayerComponent";
import { TypographyComponent } from "../../../../../components/typography/Typography";
import { AnchorLink } from "../../../../../components/anchorLink/AnchorLink";

export interface Props {
    selectedEventsId: number
}

export const EventDetailsComponent : React.FC<Props> = props =>   {

    const componentClass = 'EventDetailsComponent';

    return (
        <div className={componentClass}>                        
            <PlayerComponent 
                hasTimeline={true} 
                hasTimer={true} 
                hasVolumeControls={true} 
                hasControlsBtns={true}
                hasSettings={true}
                message="Обнаружен человек" 
                cameraRecordId={1}
                />
            <div className={`${componentClass}__description`}>
                <TypographyComponent variant="h2-title">
                    Информация о событии
                </TypographyComponent>
                <div className={`${componentClass}__descriptionItem`}>
                    Детали события
                </div>
                <div className={`${componentClass}__descriptionItem`}>
                    Детали события
                </div>
                <div className={`${componentClass}__descriptionItem`}>
                    Детали события
                </div>
            </div>
            <div className={`${componentClass}__backToEventBtn`}>
                <AnchorLink href={`#item-${props.selectedEventsId}`} offset={50}>Вернуться к событию</AnchorLink>
            </div>
        </div>
    )
}
