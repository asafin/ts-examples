import * as React from "react";
import * as rx from "rxjs/Rx";
import { ComponentBase } from "../../../../../codebase/ComponentBase";
import { ClientApplication } from "../../ClientApplication";
import { withClientApplicationContext } from "../../../../../components/context/WithClientApplicationContext";
import { RecordModel } from "../../../../../codebase/RecordModel";
import { ListCamerasRequest, ListCamerasResponse } from "@svsai/client-api";
import { Link } from "react-router-dom";
import CameraListItemComponent from "./item/CameraListItemComponent";
import { flatMap } from "rxjs/operators";


interface Props {
    application: ClientApplication,
    selectedCameraRecordId:  number,
    onClick: (recordId: number) => rx.Observable<void>
}

interface State {
    inProgress: boolean,
    cameraList: RecordModel []
}

class CameraListComponent extends ComponentBase<Props, State> {

    constructor (props: Props){
        super (CameraListComponent.name, props)
        
        this.state = {
            cameraList: [],
            inProgress: false
        }
    }

    componentDidMount() {
        this.refresh()
            .takeUntil(this.unmounted)
            .subscribe(this.logger.rx.subscribe(this.refresh.name))
    }

    private readonly refresh = () => this.flatState({inProgress: true})
        .flatMap(this.getCameraList)
        .flatMap(this.setSelectedCameraRecordId)
        

    private readonly getCameraList = () => this.props.application.props.application.client.listCameras(this.createListCamerasRequest())
        .map(this.parseListCamerasResponse)
        .flatMap(cameraList => this.flatState({cameraList, inProgress: false}))

    private readonly setSelectedCameraRecordId = () => {
        if (!this.props.selectedCameraRecordId && this.state.cameraList.length > 0) {
            return this.props.onClick(this.state.cameraList[0].recordId)
        }

        return rx.Observable.empty()
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

    private readonly handleCameraItemClick = (recordId: number) => this.props.onClick(recordId)
    .takeUntil(this.unmounted)
    .subscribe(this.logger.rx.subscribe(this.handleCameraItemClick.name))

    public readonly render = () => {

        const componentClass = CameraListComponent.name

        const getContent = () => {
            if (this.state.cameraList.length > 0) {
                return getList()                
            }
            else {
                return getEmptyCameraListMessage()
            }
        }

        const getList = () => this.state.cameraList.map(item => {
            return <CameraListItemComponent 
                    isSelected={item.recordId == this.props.selectedCameraRecordId}
                    listener={this.refresh}
                    onClick={this.handleCameraItemClick}
                    recordIdCamera={item.recordId}
                    key={JSON.stringify(item)}
                />
        })

        const getEmptyCameraListMessage = () => {
            return (
                <div className={`${componentClass}__emptyCameraListMessage`}>                    
                    У вас нет камер, доступных для просмотра. 
                    <Link to={`/clients/${this.props.application.props.recordIdClient}/cameras/add`}>
                        Подключите камеру    
                    </Link> 
                </div>
                
            )
        }

        return (
            <div className={componentClass}>
                {getContent()}
            </div>
        )
    }
}

export default withClientApplicationContext(CameraListComponent)
