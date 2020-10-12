import * as rx from "rxjs/Rx"
import * as React from "react";
import { ComponentBase } from "../../../../../codebase/ComponentBase";
import { ClientApplication } from "../../ClientApplication";
import { withClientApplicationContext } from "../../../../../components/context/WithClientApplicationContext";
import { ListServicesResponse, ListCameraEventsRequest, ListCameraEventsResponse, Int64Value, StreamCameraEventsRequest, StreamCameraEventsResponse} from '@svsai/client-api'
import { ServiceModel} from "../../components/servicesSelect/ServicesSelectComponent"
import { CameraEventRenderModel } from "../../../../../codebase/CameraEventRenderModel";
import { EventsListItemComponent } from "./item/EventsListItemComponent";
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { WebSocketAdapter } from "../../../../../codebase/WebSocketAdapter";

export interface EventsGroupModel {
    date: number,
    list: CameraEventRenderModel []
}

interface Props {
    application: ClientApplication,
    selectedCameraRecordId: number
}

export interface State {
    inProgress: boolean,
    events: CameraEventRenderModel [],
    total: number,
    itemHeight: number,
    itemWidth: number,
    servicesList: ServiceModel [],
    selectedEventsId: number,
    wrapperPosition: number,
    position: number,
    leftBtnDisable: boolean,
    rightBtnDisable: boolean
}

class EventsListComponent extends ComponentBase<Props, State> {

    private readonly list = React.createRef<HTMLDivElement>()
    private readonly wrapper = React.createRef<HTMLDivElement>()
    private readonly recordIdCameraObservable = new rx.Subject<number> ()

    private readonly minRangeValue = 5;

    constructor (props: Props){
        super (EventsListComponent.name, props)

        this.state = {
            events: [],
            inProgress: false,
            itemHeight: 160,
            itemWidth: 200,
            selectedEventsId: null,
            servicesList: [],
            total: 0,
            wrapperPosition: 0,
            position: 0,
            leftBtnDisable: false,
            rightBtnDisable: true
        }
    }

    componentDidMount = () => {
        /*
        if (this.props.selectedCameraRecordId) {
            this.getInitialLists();  
        }
        */

       this.recordIdCameraObservable
            .switchMap (recordIdCamera => rx.Observable.of ({})
                .flatMap (() => {
                    const client = new WebSocketAdapter<StreamCameraEventsRequest,StreamCameraEventsResponse> (this.props.application.props.application.client.streamCameraEvents ());

                    let events : CameraEventRenderModel [] = []
    
                    return rx.Observable.merge (
                        client.getCloseObservable ().flatMap (() => rx.Observable.throwError ('Connection is closed')),
                        client.getErrorObservable (),
                        client.getResponseObservable ()
                            .concatMap (response => {

                                if (events.length > 10) {
                                    events = events.slice (1, 1)
                                }

                                events.push ({
                                    cameraName : '',
                                    imageUrl : response.success.event.imageUrl,
                                    recordId : parseInt (response.success.event.recordId),
                                    serviceName : '',
                                    timestamp : parseInt (response.success.event.timestamp)
                                })

                                console.log (events.length)

                                return this.flatState ({
                                    events : events.reverse ()
                                })
                            }),
                        client.connect ()
                            .do (() => client.send ({recordIdCamera : recordIdCamera.toString ()}))
                    )    
                })
                .retryWhen (this.logger.rx.retry ("Error streaming events"))
            )
            .takeUntil (this.unmounted)
            .finally (() => console.log ('Stream camera events is stopped'))
            .subscribe (this.logger.rx.subscribe ("Error playing camera"))
            
                /*
        rx.Observable.fromEvent(window, 'resize')
            .flatMap(()=> this.setEventItemSize())
            .takeUntil(this.unmounted)
            .subscribe(this.logger.rx.subscribe(this.componentDidMount.name));
            */
        
        this.componentDidUpdate ({})
    }

    componentDidUpdate = (prevProps: Partial<Props>) => {
        
        if (prevProps.selectedCameraRecordId != this.props.selectedCameraRecordId && this.props.selectedCameraRecordId != null) {
            console.log (this.props.selectedCameraRecordId)
            this.recordIdCameraObservable.next (this.props.selectedCameraRecordId)
        }
        
    }
    /*
    private readonly getInitialLists = () => this.getServicesList()
        .flatMap(()=> this.refresh())    
        .takeUntil(this.unmounted)
        .subscribe(this.logger.rx.subscribe(this.getInitialLists.name));

    private readonly refresh = () => this.flatState({inProgress: true})
        .flatMap(() => this.props.application.props.application.client.listCameraEvents(this.createListCameraEventsRequest()))
        .map(this.parseListCameraEventsResponse)        
        .flatMap(result => this.flatState(state => ({
            events: result.events,
            total: result.total,
            position: result.events.length
        })))        
        .flatMap(()=> this.flatState({inProgress: false}))
        .flatMap(() => this.setEventItemSize())
        

    private readonly createListCameraEventsRequest = () : ListCameraEventsRequest => {       

        let from : Int64Value = null
        let to : Int64Value = null  

        return {
            offset: '0',
            limit: '50',
            recordIdClient: {
                value: this.props.application.props.recordIdClient.toString()
            },
            sort: {
                asc: {}
            },
            recordIdCamera: {
                value: this.props.selectedCameraRecordId.toString()
            }
        }
    } */

    private readonly parseListCameraEventsResponse = (response: ListCameraEventsResponse) : {total: number, events: CameraEventRenderModel []} => {
        if (response.success) {
            if (parseInt(response.success.total) > 0 && response.success.events) {
                return {
                    total: parseInt(response.success.total),
                    events: response.success.events.map(event => {
                        return {
                            recordId: parseInt(event.recordId),
                            serviceName: this.getServiceName(parseInt(event.recordIdService)),
                            timestamp: parseInt(event.timestamp),
                            imageUrl: event.imageUrl
                        }
                    }   
                )}
            }
            else {
                return {
                    total: 0,
                    events: []
                }
            }           
        }            
        else if (response.cameraDoesNotExists) {
        }
        else if (response.clientDoesNotExists) {
        }
        else if (response.serviceDoesNotExists) {
        }
    }
    

    private getItemHeight = () => {
        return this.getItemWidth() * 9 / 16; 
    }

    private getItemWidth = () => {
        let width = this.list.current.offsetWidth;
        return (width / 5) - 2; 
    }
    
    private readonly setEventItemSize = () => this.flatState(state => ({
        itemHeight: this.getItemHeight(),
        itemWidth: this.getItemWidth(),
        wrapperPosition:  this.getWrapperPosition(state.position)
    }))

    private readonly getWrapperPosition = (position: number) => position * (this.getItemWidth() + 2) - (this.getItemWidth() + 2) * 5 

    private readonly getServiceName = (recordId: number) : string => {
        if (this.state.servicesList.find(service => service.recordId == recordId)) {
            return this.state.servicesList.find(service => service.recordId == recordId).name
        }
        else {
            this.getServicesList().takeUntil(this.unmounted).subscribe(this.logger.rx.subscribe(this.getServiceName.name))
            return this.getServiceName(recordId)
        }
    }

    private readonly setSelectedEventsId = (selectedEventsId: number) => this.flatState(state => ({
        selectedEventsId: state.selectedEventsId != selectedEventsId ? selectedEventsId : null
    }))
    .takeUntil(this.unmounted)
    .subscribe(this.logger.rx.subscribe(this.setSelectedEventsId.name))

    private readonly getServicesList = () => this.props.application.props.application.client.listServices({})
        .map(this.parseListServicesResponse)
        .flatMap(servicesList => this.flatState({servicesList}))

    private readonly parseListServicesResponse = (response: ListServicesResponse) => {
        if (response.success && response.success.services) {
            return response.success.services.map(service => {
                return {
                    name: service.name,
                    recordId: parseInt(service.recordId),
                    code: service.code
                }
            })
        }
        else {
            return []
        }
    }

    private readonly getWrapperWidth = () => {
        return (this.state.itemWidth + 2) * this.state.events.length
    }

    private readonly handleLeftBtnClick = () => this.flatState(state => ({
        position: !state.leftBtnDisable ? state.position - 1 : state.position        
    }))
        .flatMap(()=> this.handleSliderPositionChange())
        .takeUntil(this.unmounted)
        .subscribe(this.logger.rx.subscribe(this.handleLeftBtnClick.name));

    private readonly handleRightBtnClick = () => this.flatState(state => ({
            position: !state.rightBtnDisable ? state.position + 1 : state.position
        }))
            .flatMap(()=> this.handleSliderPositionChange())
            .takeUntil(this.unmounted)
            .subscribe(this.logger.rx.subscribe(this.handleRightBtnClick.name));           

    private readonly handleSliderControl = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.persist();

        this.flatState({
            position: parseInt(event.target.value)
        })
        .flatMap(() => this.handleSliderPositionChange())
        .takeUntil(this.unmounted)
        .subscribe(this.logger.rx.subscribe(this.handleSliderControl.name))
    }        

    private readonly handleSliderPositionChange = () => this.flatState({
        wrapperPosition: this.getWrapperPosition(this.state.position),
        rightBtnDisable: this.state.position == this.state.events.length,
        leftBtnDisable: this.state.position == this.minRangeValue,
    }) 

    public readonly render = () => {

        const componentClass = EventsListComponent.name;

        const {selectedEventsId, events, itemHeight, itemWidth, wrapperPosition, position, leftBtnDisable, rightBtnDisable} = this.state

        return (
            <div className={componentClass} >
                <div className={`${componentClass}__cutter`} ref={this.list} style={{height: itemHeight}} >
                    <div className={`${componentClass}__wrapper`} style={{height: itemHeight, width: this.getWrapperWidth(), left: - wrapperPosition}}>
                        {
                            events.map(item => {
                                return <EventsListItemComponent 
                                    isSelected={selectedEventsId == item.recordId}
                                    event={item}
                                    listener={this.setSelectedEventsId}    
                                    key={JSON.stringify(item)}
                                    height={itemHeight}
                                    width={itemWidth}
                                />
                            })
                        }
                    </div> 
                </div>                  
                <div className={`${componentClass}__nav`}>
                    <div className={`arrow arrow_left ${leftBtnDisable ? 'disabled' : ''}`} onClick={this.handleLeftBtnClick}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </div>
                    <div className={`arrow arrow_right ${rightBtnDisable ? 'disabled' : ''}`}>
                        <FontAwesomeIcon icon={faChevronRight} onClick={this.handleRightBtnClick} />
                    </div>
                </div>   
                <div className={`${componentClass}__inputRange`}>
                    <input 
                        type="range" 
                        min={this.minRangeValue} 
                        max={events.length} 
                        value={position} 
                        className="eventsSlider" 
                        onChange={this.handleSliderControl} 
                        />
                </div>              
            </div>
        )
    }
}

export default withClientApplicationContext(EventsListComponent)

