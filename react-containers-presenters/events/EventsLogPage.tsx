import * as rx from "rxjs/Rx"
import * as React from "react";
import {createBrowserHistory} from "history";
import { ComponentBase } from "../../../../codebase/ComponentBase";
import { SwitchViewComponent, ListViewType } from "../../../../components/switchView/SwitchViewComponent";
import { EventDetailsComponent } from "./eventDetails/EventDetailsComponent";
import * as utils from '../../../../utils';
import { EventsGroupComponent } from "./eventsGroup/EventsGroupComponent";
import { EventsLogFiltersComponent } from "./filters/EventsLogFiltersComponent";
import { EventsLogHeaderComponent } from "./eventsLogHeader/EventsLogHeaderComponent";
import { BackToTopBtnComponent } from "../../../../components/backToTopBtn/BackToTopBtnComponent";
import { RecordModel } from "../../../../codebase/RecordModel";
import { ClientApplication } from "../ClientApplication";
import { withClientApplicationContext } from "../../../../components/context/WithClientApplicationContext";
import { ListCamerasRequest, ListCamerasResponse, ListServicesResponse, ListCameraEventsRequest, ListCameraEventsResponse, CameraEventModel, Int64Value} from '@svsai/client-api'
import { ServiceModel} from "../components/servicesSelect/ServicesSelectComponent"
import {SERVICE} from "@svsai/client-api/generated/api"
import { CameraEventRenderModel } from "../../../../codebase/CameraEventRenderModel";
import { ActionButton } from "../../../../components/buttons/Buttons";

export interface EventsGroupModel {
    date: number,
    list: CameraEventRenderModel []
}

interface Props {
    application: ClientApplication
}

export interface State {
    listViewType: ListViewType,
    selectedEventsId: number,
    events: CameraEventRenderModel [],
    groupedEvents: EventsGroupModel [],
    total: number,
    offset: number,
    limit: number,
    hasMore: boolean,
    cameraList: RecordModel [],
    selectedCameraRecordId:  number,
    dateRangeSelected: number [],
    servicesList: ServiceModel [],
    selectedServiceItem: ServiceModel,
    inProgress: boolean
}

const history = createBrowserHistory();

class EventsLogPage extends ComponentBase<Props, State> {

    private readonly list = React.createRef<HTMLDivElement>()

    constructor (props: Props){
        super (EventsLogPage.name, props)
        this.setStateInitialValuesFromQueryParams()
    }

    componentDidMount = () => {
        this.getInitialLists();                       
    }

    private readonly getInitialLists = () => this.getCameraList()
        .flatMap(() => this.getServicesList())
        .flatMap(()=> this.refresh())    
        .takeUntil(this.unmounted)
        .subscribe(this.logger.rx.subscribe(this.getInitialLists.name));

    private readonly refresh = () => this.flatState({inProgress: true, offset: 0})
        .flatMap(() => this.getlistCameraEvents())

    private readonly getMoreEvents = () =>  this.flatState(state => ({inProgress: true, offset: state.offset + 1}))
        .flatMap(() => this.getlistCameraEvents(true))    
        .takeUntil(this.unmounted)
        .subscribe(this.logger.rx.subscribe(this.getMoreEvents.name));

    private readonly getlistCameraEvents = (getMore?: boolean) => this.props.application.props.application.client.listCameraEvents(this.createListCameraEventsRequest())
        .map(this.parseListCameraEventsResponse)        
        .flatMap(result => this.flatState(state => ({
            events: getMore ? state.events.concat(result.events) : result.events,
            total: result.total
        })))        
        .flatMap(()=> this.flatState({
            groupedEvents: this.parseEventsList(),
            hasMore: this.state.events.length < this.state.total
        }))
        .flatMap(()=> this.flatState({inProgress: false}))    

    private readonly createListCameraEventsRequest = () : ListCameraEventsRequest => {
        let recordIdCamera : Int64Value = null;

        if (this.state.selectedCameraRecordId) {
            recordIdCamera = {
                value: this.state.selectedCameraRecordId.toString()
            }
        }

        let recordIdService : Int64Value = null;

        if (this.state.selectedServiceItem && this.state.selectedServiceItem.recordId) {
            recordIdService = {
                value:  this.state.selectedServiceItem.recordId.toString()
            }
        }

        let from : Int64Value = null
        let to : Int64Value = null

        if (this.state.dateRangeSelected.length > 0) {
            from = {
                value: this.state.dateRangeSelected[0].toString()
            }

            if (this.state.dateRangeSelected.length > 1) {
                to = {
                    value: this.state.dateRangeSelected[this.state.dateRangeSelected.length - 1].toString()
                }                
            }
        }    

        return {
            offset: (this.state.offset * this.state.limit).toString(),
            limit: this.state.limit.toString(),
            recordIdClient: {
                value: this.props.application.props.recordIdClient.toString()
            },
            sort: {
                desc: {}
            },
            recordIdCamera,
            recordIdService
        }
    } 

    private readonly parseListCameraEventsResponse = (response: ListCameraEventsResponse) : {total: number, events: CameraEventRenderModel []} => {
        if (response.success) {
            if (parseInt(response.success.total) > 0 && response.success.events) {
                return {
                    total: parseInt(response.success.total),
                    events: response.success.events.map(event => {
                        return {
                            recordId: parseInt(event.recordId),
                            cameraName: this.getCameraName(parseInt(event.recordIdCamera)),
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
            this.getInitialLists()
        }
        else if (response.clientDoesNotExists) {

        }
        else if (response.serviceDoesNotExists) {
            this.getInitialLists()
        }
    }

    private readonly getCameraName = (recordId: number) : string => {
        if (this.state.cameraList.find(camera => camera.recordId == recordId)) {
            return this.state.cameraList.find(camera => camera.recordId == recordId).name
        }
        else {
            this.getCameraList().takeUntil(this.unmounted).subscribe(this.logger.rx.subscribe(this.getCameraName.name))
            return this.getCameraName(recordId)
        }        
    }

    private readonly getServiceName = (recordId: number) : string => {
        if (this.state.servicesList.find(service => service.recordId == recordId)) {
            return this.state.servicesList.find(service => service.recordId == recordId).name
        }
        else {
            this.getServicesList().takeUntil(this.unmounted).subscribe(this.logger.rx.subscribe(this.getCameraName.name))
            return this.getServiceName(recordId)
        }
    }

    private readonly parseEventsList = () => {

        let eventsGroupList : EventsGroupModel [] = []

        if (this.state.events.length > 0) {

            eventsGroupList.push({
                date: utils.getDateOfTimeStamp(this.state.events[0].timestamp),
                list: []
            })          

            this.state.events.map(event => {
                if (eventsGroupList.find(eventsGroup => eventsGroup.date == utils.getDateOfTimeStamp(event.timestamp))) {
                    let elem = eventsGroupList.find(eventsGroup => eventsGroup.date == utils.getDateOfTimeStamp(event.timestamp))

                    if (!elem.list.find(item => item.recordId == event.recordId)) {
                        elem.list.push(event)
                    }                    
                }
                else {
                    eventsGroupList.push({
                        date: utils.getDateOfTimeStamp(event.timestamp),
                        list: [event]
                    })
                }
            })
        }           
        
        eventsGroupList.map(eventsGroup => eventsGroup.list.sort((a,b) => b.timestamp - a.timestamp))

        return eventsGroupList;
    }

    private readonly setListViewType = (listViewType: ListViewType) => this.flatState({
        listViewType
    })
    .do(()=> this.setQueryParams()) 
    .takeUntil(this.unmounted)  
    .subscribe(this.logger.rx.subscribe(this.setListViewType.name))


    private readonly setSelectedEventsId = (selectedEventsId: number) => this.flatState(state => ({
        selectedEventsId: state.selectedEventsId != selectedEventsId ? selectedEventsId : null
    }))
    .takeUntil(this.unmounted)
    .subscribe(this.logger.rx.subscribe(this.setSelectedEventsId.name))

    private readonly setStateInitialValuesFromQueryParams = () => {
        let urlSearchParams = new URLSearchParams(window.location.search)

        let listViewType: ListViewType = 'mosaic'
        if (urlSearchParams.get('listView') && (urlSearchParams.get('listView') == 'tile' || urlSearchParams.get('listView') == 'list') || urlSearchParams.get('listView') == 'mosaic') {
            listViewType = (urlSearchParams.get('listView') as ListViewType)
        }

        let selectedCameraRecordId: number = null
        if (urlSearchParams.get('recordId')) {
            selectedCameraRecordId = parseInt(urlSearchParams.get('recordId'))
        }

        let dateRangeSelected : number [] = [];
        if (urlSearchParams.get('dateRange') && urlSearchParams.get('dateRange').split(',').length > 0) {
            urlSearchParams.get('dateRange').split(',').map(item => {
                if (parseInt(item) > -1) {
                    dateRangeSelected.push(parseInt(item))
                }
            })
        }
        else {
            dateRangeSelected = [utils.getDateOfTimeStamp(new Date().getTime())]
        }

        let selectedServiceItem : ServiceModel = null;
        if (urlSearchParams.get('service') && urlSearchParams.get('service').split(',').length > 0) {
            const selectedServiceItemParamsArr = urlSearchParams.get('service').split(',')
            if (parseInt(selectedServiceItemParamsArr[0]) > -1 && (Object as any).values(SERVICE).includes(selectedServiceItemParamsArr[1].toUpperCase())) {
                selectedServiceItem = {
                    code: (selectedServiceItemParamsArr[1].toUpperCase() as SERVICE),
                    recordId: parseInt(selectedServiceItemParamsArr[0])
                }
            }
        }

        this.state = {
            listViewType,
            selectedEventsId: null,
            events: [],
            groupedEvents: [],
            offset: 0,
            total: 0,
            limit: 100,
            hasMore: false,
            inProgress: false,
            cameraList: [],
            selectedCameraRecordId,
            dateRangeSelected,
            servicesList: [],
            selectedServiceItem
        }

        this.setQueryParams()
    }

    private readonly setQueryParams = () => {
        let queryParams = '?';

        if (this.state.listViewType) {
            queryParams += `listView=${this.state.listViewType}`
        }

        if (this.state.selectedCameraRecordId) {
            queryParams += `&recordId=${this.state.selectedCameraRecordId}`
        }

        if (this.state.dateRangeSelected.length > 0) {
            queryParams += `&dateRange=${this.state.dateRangeSelected.join(',')}`
        }   

        if (this.state.selectedServiceItem) {
            queryParams += `&service=${this.state.selectedServiceItem.recordId},${this.state.selectedServiceItem.code}`
        }

        history.push({
            pathname: window.location.pathname,
            search: queryParams
        })
    }    

    private readonly handleFilterCameraSelectChange = (selectedCameraRecordId: number) => this.flatState({selectedCameraRecordId})
        .do(()=> this.setQueryParams()) 
        .flatMap(() => this.refresh())        
        .takeUntil(this.unmounted)
        .subscribe(this.logger.rx.subscribe(this.handleFilterCameraSelectChange.name)) 

    private readonly handleFilterServiceSelectChange = (selectedServiceItem: ServiceModel) => this.flatState({selectedServiceItem})
        .do(()=> this.setQueryParams()) 
        .flatMap(() => this.refresh())        
        .takeUntil(this.unmounted)
        .subscribe(this.logger.rx.subscribe(this.handleFilterServiceSelectChange.name)) 

    private readonly getCameraList = () => this.props.application.props.application.client.listCameras(this.createListCamerasRequest())
        .map(this.parseListCamerasResponse)
        .flatMap(cameraList => this.flatState({cameraList}))

    private readonly createListCamerasRequest = () : ListCamerasRequest => {
        return {
            recordIdClient: this.props.application.props.recordIdClient.toString()
        }
    }

    private readonly parseListCamerasResponse = (response: ListCamerasResponse) => {
        if (response.success && response.success.cameras) {
            return response.success.cameras.map(camera => {
                return {
                    name: camera.name,
                    recordId: parseInt(camera.recordId)
                }
            }) 
        }
        else {
            return []
        }
    }    

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

    private readonly handleDateRangePickerChange = (dateRangeSelected: number []) => this.flatState({dateRangeSelected})
        .do(()=> this.setQueryParams())

    public readonly render = () => {

        const componentClass = EventsLogPage.name;

        const {inProgress, selectedEventsId, cameraList, total, selectedCameraRecordId, listViewType, dateRangeSelected, selectedServiceItem, servicesList} = this.state

        const hasSelected = selectedEventsId ? `${componentClass}_hasSelected` : '';

        const renderEventsDetails = () => {
            if (selectedEventsId) {
                return (
                    <div className="eventDetails">
                        <EventDetailsComponent selectedEventsId={selectedEventsId}/>
                    </div>
                );
            }
        }

        const getGetMoreEventsBtn = () => {
            if (this.state.hasMore) {
                return <ActionButton 
                    listener={this.getMoreEvents}
                    disabled={inProgress}
                    title={getGetMoreEventsBtnTitle()}    
                    />
            }
        }

        const getGetMoreEventsBtnTitle = () => {
            if ((this.state.total - this.state.events.length) > 100){
                return "Загрузить еще 100"
            }
            else {
                return `Загрузить еще ${this.state.total - this.state.events.length}`
            }
        }

        return (
            <React.Fragment>
                <div className={`${componentClass} ${hasSelected}`}>                        
                    <div className={`eventsLog eventsLog_${listViewType}`}>
                        <div className="eventsLog-header">
                            <EventsLogHeaderComponent total={total}/>                       
                            <SwitchViewComponent listViewType={listViewType} listener={this.setListViewType} mosaic={true}/>
                        </div>
                        <EventsLogFiltersComponent 
                            cameraList={cameraList} 
                            cameraSelectListener={this.handleFilterCameraSelectChange} 
                            selectedCameraRecordId={selectedCameraRecordId} 
                            dateRangeSelected={dateRangeSelected}
                            dateRangelistener={this.handleDateRangePickerChange}
                            servicesList={servicesList}
                            selectedServiceItem={selectedServiceItem}
                            serviceSelectListener={this.handleFilterServiceSelectChange}
                            />
                        <div className="eventsLog-content" ref={this.list}>
                            {
                                this.state.groupedEvents.map(eventsGroup => <EventsGroupComponent 
                                                                        listener={this.setSelectedEventsId}
                                                                        eventsGroup={eventsGroup}
                                                                        listViewType={listViewType}
                                                                        selectedEventsId={selectedEventsId}
                                                                        key={JSON.stringify(eventsGroup.date)}
                                                                    />)
                            }                           
                        </div>
                        <div className="eventsLog-getMoreBtn">
                            {getGetMoreEventsBtn()}
                        </div>
                    </div>
                    {renderEventsDetails()}
                </div>
                <BackToTopBtnComponent />
            </React.Fragment>
        )
    }
}

export default withClientApplicationContext(EventsLogPage)

