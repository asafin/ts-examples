import * as React from "react";
import 'date-fns';
import * as mui from "@material-ui/core";
import {GlossaryActuationTypeType} from "../../../services/types";

export interface Props {
    id: string,
    value: GlossaryActuationTypeType,
    handleTypeValueChange: (event: React.ChangeEvent<{ value: GlossaryActuationTypeType}>) => void
}

export const GlossaryActuationTypeSelectComponent: React.FC<Props> = props => {

    const componentName = "SelectComponent"

    const style = {width: '100%'}

    const values : GlossaryActuationTypeType [] = ["present", "nonpresent"]

    const renderActuationType = (channel: GlossaryActuationTypeType) : string => {
         if (channel == "nonpresent") {
            return 'Не присутствует'
        }
        else {
            return 'Присутствует'
        }
    }

    const content = (
        <React.Fragment>
            <mui.Select
                labelId={props.id}
                value={props.value}
                onChange={props.handleTypeValueChange}
                variant="outlined"
                style={style}
            >

                {values.map(val => <mui.MenuItem key={val} value={val}>{renderActuationType(val)}</mui.MenuItem>)}
            </mui.Select>
        </React.Fragment>
    )

    return (
        <div className={componentName}>
            <mui.FormGroup>
                {content} 
            </mui.FormGroup>
        </div>
        
    )
}

