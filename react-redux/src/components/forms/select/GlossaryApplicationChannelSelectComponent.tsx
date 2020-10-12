import * as React from "react";
import 'date-fns';
import * as mui from "@material-ui/core";
import {GlossaryApplicationChannelType} from "../../../services/types";

export interface Props {
    id: string,
    value: GlossaryApplicationChannelType,
    handleChannelValueChange: (event: React.ChangeEvent<{ value: GlossaryApplicationChannelType}>) => void
}

export const GlossaryApplicationChannelSelectComponent: React.FC<Props> = props => {

    const componentName = "SelectComponent"

    const style = {width: '100%'}

    const values : GlossaryApplicationChannelType [] = ["all", "client", "operator"]

    const renderChannel = (channel: GlossaryApplicationChannelType) : string => {
        if (channel == "client") {
            return 'Клиент'
        }
        else if (channel == "operator"){
            return "Оператор"
        }
        else {
            return 'Все'
        }
    }

    const content = (
        <React.Fragment>
            <mui.Select
                labelId={props.id}
                value={props.value}
                onChange={props.handleChannelValueChange}
                variant="outlined"
                style={style}
            >

                {values.map(val => <mui.MenuItem key={val} value={val}>{renderChannel(val)}</mui.MenuItem>)}
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

