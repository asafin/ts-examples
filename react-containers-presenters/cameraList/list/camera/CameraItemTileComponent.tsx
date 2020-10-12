import * as React from "react";
import * as rx from "rxjs/Rx"
import { TypographyComponent } from "../../../../../../components/typography/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import *  as utils from '../../../../../../utils'
import { ComponentBase } from "../../../../../../codebase/ComponentBase";
import { withClientApplicationContext } from "../../../../../../components/context/WithClientApplicationContext";
import { ClientApplication } from "../../../ClientApplication";
import { 
    ModifyRtspCameraRequest, 
    DeleteRtspCameraRequest, 
    CameraModel, 
    GetCameraRequest, 
    GetCameraResponse,
    GetCameraServicesRequest,
    GetCameraServicesResponse} from "@svsai/client-api";
import { Link } from "react-router-dom";
import { ServiceModel } from "../../../components/servicesSelect/ServicesSelectComponent";

export interface Props {
    recordIdCamera: number,    
    servicesList: ServiceModel [],
    application: ClientApplication,
    listener: () => rx.Observable<void>
}

interface State {
    inProgress: boolean,
    showContent: boolean,
    camera: {
        camera: CameraModel,
        connectedServices: GetCameraServicesResponse.SuccessModel
    }
}

class CameraItemTileComponent extends ComponentBase<Props, State>  {

    constructor (props: Props){
        super (CameraItemTileComponent.name, props)

        this.state = {
            inProgress: false,
            showContent: false,
            camera: {
                camera: {
                    enabled: false,
                    name: '',
                    recordId: null, 
                    imageUrl: ''               
                },
                connectedServices: {
                    manAppeares: {
                        enabled: false
                    },
                    movement: {
                        enabled: false
                    },
                    recording: {
                        enabled: false
                    }
                }
            }
        }
    }    

    componentDidMount() {
        this.refresh();        
    }

    private readonly refresh = () => this.flatState({inProgress: false})
        .flatMap(this.getCamera)
        .flatMap(this.getCameraServices)
        .flatMap(() => this.flatState({inProgress: false}))
        .takeUntil(this.unmounted)
        .subscribe(this.logger.rx.subscribe(this.refresh.name))

    private readonly getCamera = () => this.props.application.props.application.client.getCamera(this.createGetCameraRequest())
        .flatMap(this.parseGetCameraResponse)
    
    private readonly createGetCameraRequest = () : GetCameraRequest => {
        return {
            recordIdCamera: this.props.recordIdCamera.toString()
        }
    }    

    private readonly parseGetCameraResponse = (response: GetCameraResponse) => {
        if (response.success && response.success.camera) {
            return this.flatState(state => ({
                camera: {
                    ...state.camera,
                    camera: response.success.camera
                }
            }))
        }
        else if (response.cameraDoesNotExists) {
            return this.props.listener()
        }
    }

    private readonly getCameraServices = () => this.props.application.props.application.client.getCameraServices(this.createGetCameraServicesRequest())
        .flatMap(this.parseGetCameraServicesResponse)

    private readonly createGetCameraServicesRequest = () : GetCameraServicesRequest => {
        return {
            recordIdCamera: this.props.recordIdCamera.toString()
        }
    }

    private readonly parseGetCameraServicesResponse = (response: GetCameraServicesResponse) => {
        if (response.success) {
            return this.flatState(state => ({
                camera: {
                    ...state.camera,
                    connectedServices: {
                        manAppeares: {
                            enabled: response.success.manAppeares ? response.success.manAppeares.enabled : false
                        },
                        movement: {
                            enabled: response.success.movement ? response.success.movement.enabled : false
                        },
                        recording: {
                            enabled: response.success.recording ? response.success.recording.enabled : false
                        }
                    }
                }
            }))
        }
        else if (response.cameraDoesNotExists) {
            return this.props.listener()
        }
    }

    private readonly setShowContent = () => this.flatState(state => ({
        showContent: !state.showContent
    }))
        .takeUntil(this.unmounted)
        .subscribe(this.logger.rx.subscribe(this.setShowContent.name))

    private readonly changeCameraActiveStatus = () => this.props.application.props.application.client.modifyRtspCamera(this.createModifyRtspCameraRequest())
        .flatMap(this.parseModifyRtspCameraResponse)    
        .flatMap(() => this.flatState({showContent: false}))
        .takeUntil(this.unmounted)
        .subscribe(this.logger.rx.subscribe(this.changeCameraActiveStatus.name))

    private readonly createModifyRtspCameraRequest = () : ModifyRtspCameraRequest => {
        return {
            enabled: {
                value: !this.state.camera.camera.enabled
            },
            recordIdCamera: this.props.recordIdCamera.toString()
        }
    }

    private readonly parseModifyRtspCameraResponse = () => this.getCamera()

    private readonly deleteCamera = () => this.props.application.props.application.client.deleteCamera(this.createDeleteRtspCameraRequest())
        .flatMap(this.parseDeleteRtspCameraResponse)    
        .flatMap(() => this.flatState({showContent: false}))
        .takeUntil(this.unmounted)
        .subscribe(this.logger.rx.subscribe(this.deleteCamera.name))

    private readonly createDeleteRtspCameraRequest = () : DeleteRtspCameraRequest => {
        return {
            recordIdCamera: this.props.recordIdCamera.toString()
        }
    }    

    private readonly parseDeleteRtspCameraResponse = () => this.props.listener()

    private readonly getServicesList = () => {
        let servicesList : string [] = []
        const connectedServices = this.state.camera.connectedServices

        if (connectedServices.manAppeares.enabled) {
            servicesList.push('Появление человека')
        } 
        
        if (connectedServices.movement.enabled) {
            servicesList.push('Движение')
        }

        if (connectedServices.recording.enabled) {
            servicesList.push('Запись')
        }

        return servicesList.join(', ')
    }

    public readonly render = () => {
        const componentClass = CameraItemTileComponent.name

        const {showContent} = this.state
        const {camera} = this.state

        const getStatus = () => {
            if (camera.camera.enabled) {
                return (
                    <div className={`${componentClass}__status ${componentClass}__status_working`}>
                        Работает
                    </div>
                )
            }
            else {
                return (
                    <div className={`${componentClass}__status ${componentClass}__status_offline`}>
                        Выключена
                    </div>
                )
            }
            // else if (status == 'auth-error') {
            //     return (
            //         <div className={`${componentClass}__status ${componentClass}__status_error`}>
            //             <span>Ошибка авторизации </span>
            //             <FontAwesomeIcon icon={faExclamationTriangle}/>
            //         </div>
            //     )
            // }
            // else if (status == 'disconnected') {
            //     return (
            //         <div className={`${componentClass}__status ${componentClass}__status_error`}>
            //             <span>Нет связи</span>
            //             <FontAwesomeIcon icon={faExclamationTriangle}/>
            //         </div>
            //     )
            // }
        }

        const getImageUrl = () => {
            if (camera.camera.imageUrl && camera.camera.imageUrl.length > 0) {
                return camera.camera.imageUrl
            }
            else {
                return 'https://dummyimage.com/334x140/8c92a2/fff.png&text=Превью+недоступно'
            }
        }

        return (
            <div className={componentClass}>
                <div className={`${componentClass}__header`}>
                    <div className={`${componentClass}__header__column ${componentClass}__header__column_left`}>
                        <TypographyComponent variant="h2-title" title={camera.camera.name}>
                            {camera.camera.name}
                        </TypographyComponent>
                        <div className={`${componentClass}__header__bottom`}>
                            {getStatus()}
                            <div className={`${componentClass}__duration`}>
                                <TypographyComponent variant="description" >
                                    {utils.renderFullDateDuration(19020000)}
                                </TypographyComponent>
                            </div>
                        </div>                        
                    </div>
                    <div className={`${componentClass}__header__column ${componentClass}__header__column_right`}>
                        <div className={`${componentClass}__actions`}>
                            <div className={`${componentClass}__actions-btn`} onClick={this.setShowContent}>
                                <FontAwesomeIcon icon={faEllipsisV} />
                            </div>
                            <div className={`${componentClass}__actions-content ${showContent ? 'showContent' : ''}`}>
                                <div className={`${componentClass}__action-item`} >
                                    <Link to={`/clients/${this.props.application.props.recordIdClient}/cameras/${this.props.recordIdCamera}/edit?tab=camera`}>Настройки</Link>
                                </div>
                                <div className={`${componentClass}__action-item`} >
                                    <Link to={`/clients/${this.props.application.props.recordIdClient}/cameras/${this.props.recordIdCamera}/edit?tab=services`}>Подключить услугу</Link>
                                </div>
                                <div className={`${componentClass}__action-item`} onClick={this.changeCameraActiveStatus}>
                                    {camera.camera.enabled ? 'Выключить' : 'Включить'}
                                </div>
                                <div className={`${componentClass}__action-item`} onClick={this.deleteCamera}>
                                    Удалить
                                </div>
                            </div> 
                        </div> 
                    </div>
                </div>
                <div className={`${componentClass}__preview`}>
                    <img src={getImageUrl()} />
                </div>
                <div className={`${componentClass}__services`}>
                    <TypographyComponent variant="description" >
                        Подключенные услуги: {this.getServicesList()}
                    </TypographyComponent>
                </div>
            </div>
        );
    }
}

export default withClientApplicationContext(CameraItemTileComponent)