import * as React from "react";

import { ListCamerasRequest, ListCamerasResponse, ListServicesResponse } from "@svsai/client-api";
import CameraItemListComponent from "./camera/CameraItemListComponent";
import CameraItemTileComponent from "./camera/CameraItemTileComponent";
import { ClientApplication } from "../../ClientApplication";
import { ListViewType, SwitchViewComponent } from "../../../../../components/switchView/SwitchViewComponent";
import { RecordModel } from "../../../../../codebase/RecordModel";
import { ServiceModel } from "../../components/servicesSelect/ServicesSelectComponent";
import { ComponentBase } from "../../../../../codebase/ComponentBase";
import {createBrowserHistory} from "history";
import { InputTextComponent } from "../../../../../components/input/InputComponent";
import { RecordSelectComponent } from "../../../../../components/select/SelectComponent";
import { withClientApplicationContext } from "../../../../../components/context/WithClientApplicationContext";
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from "react-router-dom";

interface Props {
    application: ClientApplication
}

interface State {
    searchFieldValue: string,
    listViewType: ListViewType,
    cameraList: RecordModel [],
    selectedCameraRecordId:  number,
    servicesList: ServiceModel []
}

const history = createBrowserHistory();

class CameraListComponent extends ComponentBase<Props, State> {

    constructor (props: Props){
        super (CameraListComponent.name, props)

        this.setStateInitialValuesFromQueryParams()
    }

    componentDidMount () {
        this.getInitialLists();
    }

    private readonly handleSearchInputFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => this.flatState({searchFieldValue: event.currentTarget.value})
        .do(()=> this.setQueryParams()) 
        .takeUntil(this.unmounted)
        .subscribe(this.logger.rx.subscribe(this.handleSearchInputFieldChange.name))

    private readonly setListViewType = (listViewType: ListViewType) => this.flatState({listViewType})
        .do(()=> this.setQueryParams())   
        .takeUntil(this.unmounted)  
        .subscribe(this.logger.rx.subscribe(this.setListViewType.name))

    private readonly handleFilterCameraSelectChange = (selectedCameraRecordId: number) => this.flatState({selectedCameraRecordId})
        .do(()=> this.setQueryParams()) 
        .takeUntil(this.unmounted)
        .subscribe(this.logger.rx.subscribe(this.handleFilterCameraSelectChange.name)) 

    private readonly setStateInitialValuesFromQueryParams = () => {
        let urlSearchParams = new URLSearchParams(window.location.search)

        let listViewType: ListViewType = 'tile'
        if (urlSearchParams.get('listView') && (urlSearchParams.get('listView') == 'tile' || urlSearchParams.get('listView') == 'list')) {
            listViewType = (urlSearchParams.get('listView') as ListViewType)
        }

        let selectedCameraRecordId: number = null
        if (urlSearchParams.get('recordId')) {
            selectedCameraRecordId = parseInt(urlSearchParams.get('recordId'))
        }

        let searchFieldValue: string = ''
        if (urlSearchParams.get('search')) {
            searchFieldValue = urlSearchParams.get('search')
        }

        this.state = {
            searchFieldValue,
            listViewType,
            cameraList: [],
            selectedCameraRecordId,
            servicesList: []
        }

        this.setQueryParams()
    }    

    private readonly getInitialLists = () => this.getServicesList()
        .flatMap(() => this.getCameraList())
        .takeUntil(this.unmounted)
        .subscribe(this.logger.rx.subscribe(this.getInitialLists.name));

    private readonly getCameraList = () => this.props.application.props.application.client.listCameras(this.createListCamerasRequest())
        .map(this.parseListCamerasResponse)
        .flatMap(cameraList => this.flatState({cameraList}))

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

    private readonly setQueryParams = () => {
        let queryParams = '?';

        if (this.state.listViewType) {
            queryParams += `&listView=${this.state.listViewType}`
        }

        if (this.state.searchFieldValue.length > 0) {
            queryParams += `&search=${this.state.searchFieldValue}`
        }

        if (this.state.selectedCameraRecordId) {
            queryParams += `&recordId=${this.state.selectedCameraRecordId}`
        }

        history.push({
            pathname: window.location.pathname,
            search: queryParams
        })
    }   

    public readonly render = () => {

        const componentClass = CameraListComponent.name

        const {searchFieldValue, selectedCameraRecordId, cameraList, listViewType, servicesList} = this.state

        const getList = () => {
            if (listViewType == 'list') {
                return cameraList.map(camera => <CameraItemListComponent listener={this.getCameraList} servicesList={servicesList} recordIdCamera={camera.recordId} key={JSON.stringify(camera)}/>)
            }
            else {
                return cameraList.map(camera => <CameraItemTileComponent listener={this.getCameraList} servicesList={servicesList} recordIdCamera={camera.recordId} key={JSON.stringify(camera)}/>)
            }
        }

        const getEmptyCameraListMessage = () => {
            return (
                <Link to={`/clients/${this.props.application.props.recordIdClient}/cameras/add`} className={`${componentClass}__emptyCameraListMessage`}>
                    <FontAwesomeIcon icon={faPlusCircle} className={`${componentClass}__emptyCameraListMessage__icon`}/>
                    <div className={`${componentClass}__emptyCameraListMessage__text`}>
                        Подключить камеру                       
                    </div>   
                </Link> 
            )
        }

        const getContent = () => {
            if (cameraList.length > 0) {
                return getList()
            }
            else {
                return getEmptyCameraListMessage()
            }
        }

        return (
            <div className={componentClass}>
                <div className={`${componentClass}__header`}>
                    <InputTextComponent placeholder="Поиск" onChange={this.handleSearchInputFieldChange} value={searchFieldValue} />
                    <RecordSelectComponent 
                        items={cameraList}
                        listener={this.handleFilterCameraSelectChange}
                        selectedItemId={selectedCameraRecordId}
                        chooseAllTitle='Все'                 
                    />
                    <SwitchViewComponent listViewType={listViewType} listener={this.setListViewType} />
                </div>  
                <div className={`${componentClass}__content`}>
                    {getContent()}
                </div>                
            </div>
        )
    }
}

export default withClientApplicationContext(CameraListComponent)