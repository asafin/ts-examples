import * as React from "react";
import 'date-fns';
import * as mui from "@material-ui/core"
import {CallDirection} from "../../../services/types";

export interface Props {
    id: string,
    label: string,
    value: CallDirection,
    handleDirectionValueChange: (event: React.ChangeEvent<{ value: CallDirection}>) => void
}

export const DirectionSelectComponent: React.FC<Props> = props => {

    const componentName = "SelectComponent"

    const style = {width: '100%'}

    const values : CallDirection [] = [0, 1, 2]

    const renderDirection = (direction: CallDirection) : string => {
        if(direction == 0) {
            return 'все'
        }
        else if (direction == 1) {
            return 'исходящие'
        }
        else {
            return 'входящие'
        }
    }

    const content = (
        <React.Fragment>
            <mui.InputLabel id={props.id}>{props.label}</mui.InputLabel>
            <mui.Select
                labelId={props.id}
                value={props.value}
                onChange={props.handleDirectionValueChange}
                variant="outlined"
                style={style}
            >

                {values.map(val => <mui.MenuItem key={val} value={val}>{renderDirection(val)}</mui.MenuItem>)}
            </mui.Select>
        </React.Fragment>
    )

    return (
        <div className={componentName}>
            <mui.FormGroup >
                {content} 
            </mui.FormGroup>
        </div>        
    )
}

