import * as React from "react";
import * as rx from "rxjs/Rx";
import { ComponentBase } from "../../../../codebase/ComponentBase";
import { ClientApplication } from "../ClientApplication";
import { withClientApplicationContext } from "../../../../components/context/WithClientApplicationContext";
import {createBrowserHistory} from "history";
import { TypographyComponent } from "../../../../components/typography/Typography";
import { AddIconButton } from "../../../../components/buttons/Buttons";
import CameraListComponent from "./cameraList/CameraListComponent";
import RtspCameraViewerComponent from "./viewer/RtspCameraViewerComponent";
import EventsListComponent from "./eventList/EventsListComponent";


interface Props {
    application: ClientApplication
}

interface State {
    selectedCameraRecordId:  number
}

const history = createBrowserHistory();

class LiveStreamPage extends ComponentBase<Props, State> {

    constructor (props: Props){
        super (LiveStreamPage.name, props)
        this.setStateInitialValuesFromQueryParams()
    }

    componentDidMount() {
    }

    private readonly setStateInitialValuesFromQueryParams = () => {
        let urlSearchParams = new URLSearchParams(window.location.search)


        let selectedCameraRecordId: number = null
        if (urlSearchParams.get('recordId')) {
            selectedCameraRecordId = parseInt(urlSearchParams.get('recordId'))
        }

        this.state = {
            selectedCameraRecordId
        }

        this.setQueryParams()
    }  

    private readonly setQueryParams = () => {
        let queryParams = '?';

        if (this.state.selectedCameraRecordId) {
            queryParams += `&recordId=${this.state.selectedCameraRecordId}`
        }

        history.push({
            pathname: window.location.pathname,
            search: queryParams
        })
    }  

    private readonly handleCameraItemClick = (selectedCameraRecordId: number) => this.flatState({selectedCameraRecordId})
        .do(() => this.setQueryParams())
        

    public readonly render = () => {

        const componentClass = LiveStreamPage.name

        const {selectedCameraRecordId} = this.state;

        return (
            <div className={componentClass}>
                <div className={`${componentClass}__header`}>
                    <TypographyComponent variant="h1-title">
                        Онлайн
                    </TypographyComponent>
                    <AddIconButton path={`/clients/${this.props.application.props.recordIdClient}/cameras/add`} title="Добавить новую камеру" />
                </div>
                <div className={`${componentClass}__content`}>
                    <div className={`${componentClass}__column ${componentClass}__column_left`}>
                        <RtspCameraViewerComponent recordIdCamera={selectedCameraRecordId} />
                        <EventsListComponent selectedCameraRecordId={selectedCameraRecordId} />
                    </div>
                    <div className={`${componentClass}__column ${componentClass}__column_right`}>
                        <CameraListComponent onClick={this.handleCameraItemClick} selectedCameraRecordId={selectedCameraRecordId} />
                    </div>                    
                </div>  
            </div>
        )
    }
}

export default withClientApplicationContext(LiveStreamPage)
