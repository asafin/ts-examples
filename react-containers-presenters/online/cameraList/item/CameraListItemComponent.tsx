import * as React from "react";
import * as rx from "rxjs/Rx"
import { TypographyComponent } from "../../../../../../components/typography/Typography";
import { ComponentBase } from "../../../../../../codebase/ComponentBase";
import { withClientApplicationContext } from "../../../../../../components/context/WithClientApplicationContext";
import { ClientApplication } from "../../../ClientApplication";
import { 
    CameraModel, 
    GetCameraRequest, 
    GetCameraResponse} from "@svsai/client-api";

export interface Props {
    recordIdCamera: number,    
    application: ClientApplication,
    onClick: (recordId: number) => void,
    listener: () => rx.Observable<void>,
    isSelected: boolean
}

interface State {
    inProgress: boolean,
    camera: CameraModel
}

class CameraListItemComponent extends ComponentBase<Props, State>  {

    constructor (props: Props){
        super (CameraListItemComponent.name, props)

        this.state = {
            inProgress: false,
            camera: {
                enabled: false,
                name: '',
                recordId: null, 
                imageUrl: ''               
            }
        }
    }    

    componentDidMount() {
        this.refresh();        
    }

    private readonly refresh = () => this.flatState({inProgress: false})
        .flatMap(this.getCamera)
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
            return this.flatState({
                camera: response.success.camera
            })
        }
        else if (response.cameraDoesNotExists) {
            return this.props.listener()
        }
    }

    
    public readonly render = () => {
        const componentClass = CameraListItemComponent.name

        const {camera} = this.state

        const getStatus = () => {
            if (camera.enabled) {
                return (
                    <div className={`${componentClass}__status ${componentClass}__status_working`}>
                    </div>
                )
            }
            else {
                return (
                    <div className={`${componentClass}__status ${componentClass}__status_offline`}>
                    </div>
                )
            }
        }

        const getImageUrl = () => {
            if (camera.imageUrl && camera.imageUrl.length > 0) {
                return camera.imageUrl
            }
            else {
                return 'https://dummyimage.com/334x140/8c92a2/fff.png&text=Превью+недоступно'
            }
        }

        const getClass = () => this.props.isSelected ? `${componentClass}_selected ${componentClass}` : `${componentClass}`

        return (
            <div className={getClass()} onClick={() => this.props.onClick(this.props.recordIdCamera)}>
                <div className={`${componentClass}__column ${componentClass}__column_left`}>
                    <div className={`${componentClass}__preview`}>
                        <img src={getImageUrl()} />
                    </div>
                    {getStatus()}
                </div>
                <div className={`${componentClass}__column ${componentClass}__column_right`}>
                    <TypographyComponent variant="h2-title" title={camera.name}>
                        {camera.name}
                    </TypographyComponent>
                </div>    
            </div>
        );
    }
}

export default withClientApplicationContext(CameraListItemComponent)