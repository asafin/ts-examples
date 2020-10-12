import * as React from "react";
import * as rx from "rxjs/Rx";
import { ComponentBase } from "../../../../codebase/ComponentBase";
import { ClientApplication } from "../ClientApplication";
import { withClientApplicationContext } from "../../../../components/context/WithClientApplicationContext";
import { TypographyComponent } from "../../../../components/typography/Typography";
import { AddIconButton } from "../../../../components/buttons/Buttons";
import CameraListComponent from "./list/CameraListComponent";

interface Props {
    application: ClientApplication
}

class CameraListPage extends ComponentBase<Props> {

    constructor (props: Props){
        super (CameraListPage.name, props)
    }

    public readonly render = () => {
        const componentClass = CameraListPage.name

        return (
            <div className={componentClass}>
                <div className={`${componentClass}__header`}>
                    <TypographyComponent variant="h1-title">
                        Камеры
                    </TypographyComponent>
                    <AddIconButton path={`/clients/${this.props.application.props.recordIdClient}/cameras/add`} title="Добавить новую камеру" />
                </div>
                <div className={`${componentClass}__content`}>
                    <CameraListComponent />
                </div>                
            </div>
        )
    }
}

export default withClientApplicationContext(CameraListPage)
