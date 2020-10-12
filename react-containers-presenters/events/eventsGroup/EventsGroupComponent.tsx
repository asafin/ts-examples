import * as React from "react"
import * as rx from "rxjs/Rx"
import * as util from '../../../../../utils';
import { EventsGroupModel } from "../EventsLogPage";
import { ListViewType } from "../../../../../components/switchView/SwitchViewComponent";
import { EventItemTileComponent } from "../eventListItem/EventItemTileComponent";
import { EventItemListComponent } from "../eventListItem/EventItemListComponent";
import { EventItemMosaicComponent } from "../eventListItem/EventItemMosaicComponent";
import { CameraEventRenderModel } from "../../../../../codebase/CameraEventRenderModel";
import { ComponentBase } from "../../../../../codebase/ComponentBase";

export interface Props {
    eventsGroup: EventsGroupModel,
    listViewType: ListViewType,
    selectedEventsId: number,
    listener: (recordId: number) => void
}

interface State {
    itemTileHeight: number,
    itemMosaicHeight: number
}

export class EventsGroupComponent extends ComponentBase<Props, State>  {

    constructor (props: Props){
        super (EventsGroupComponent.name, props)

        this.state = {
            itemTileHeight: 198,
            itemMosaicHeight: 250
        }
    }

    componentDidMount() {
        this.setEventCardItemsHeight()
            .takeUntil(this.unmounted)
            .subscribe(this.logger.rx.subscribe(this.setEventCardItemsHeight.name));

        rx.Observable.fromEvent(window, 'resize')
            .flatMap(()=> this.setEventCardItemsHeight())
            .takeUntil(this.unmounted)
            .subscribe(this.logger.rx.subscribe(this.setEventCardItemsHeight.name));
    }

    componentDidUpdate(prevProps: Props) {
        if (prevProps.listViewType != this.props.listViewType) {
            this.setEventCardItemsHeight()
                .takeUntil(this.unmounted)
                .subscribe(this.logger.rx.subscribe(this.setEventCardItemsHeight.name));
        }
    }

    private getItemTileHeight = () => {
        let width = $('.eventCard_tile').first().width();
        return (width * 9/16 + 53); 
    }

    private getItemMosaicHeight = () => {
        let width = $('.eventCard_mosaic').first().width();
        return (width * 9/16); 
    }
    
    private readonly setEventCardItemsHeight = () => {
        if (this.props.listViewType == 'tile') {
            return this.flatState({
                itemTileHeight: this.getItemTileHeight()
            })          
        } 
        else if (this.props.listViewType == 'mosaic') {
            return this.flatState({
                itemMosaicHeight: this.getItemMosaicHeight()
            })
        }
        
        return rx.Observable.empty()
    }

    render () {
        const componentClass = EventsGroupComponent.name

        const renderEvent = (event: CameraEventRenderModel) => {
            if (this.props.listViewType == 'tile') {
                return <EventItemTileComponent 
                        event={event} 
                        listener={this.props.listener} 
                        key={JSON.stringify(event)} 
                        isSelected={event.recordId== this.props.selectedEventsId} 
                        height={this.state.itemTileHeight}
                    />
            }
            else if (this.props.listViewType == 'list') {
                return <EventItemListComponent 
                    event={event} 
                    listener={this.props.listener} 
                    key={JSON.stringify(event)} 
                    isSelected={event.recordId == this.props.selectedEventsId} />
            }
            else {
                return <EventItemMosaicComponent 
                    event={event} 
                    listener={this.props.listener} 
                    key={JSON.stringify(event)} 
                    isSelected={event.recordId== this.props.selectedEventsId} 
                    height={this.state.itemMosaicHeight}
                />
            }
        }

        return (
            <div className={`${componentClass} ${componentClass}_${this.props.listViewType} `}>
                <div className={`${componentClass}__group-title`}>
                    {util.renderLocaleDateString(this.props.eventsGroup.date)}
                </div>
                <div className={`${componentClass}__group-content`}>
                    {
                        this.props.eventsGroup.list.map(event => renderEvent(event))
                    }
                </div>
            </div>
        );
    }
}
