import * as React from "react";
import 'date-fns';
import * as mui from "@material-ui/core";
import {OneColumnLayoutComponent} from "../../layout/OneColumnLayoutComponent"

export interface Props {
    id: string,
    label: string,
    defaultValue: string,
    values: string [],
    selectAllItem ?: boolean
}

export const SelectTextComponent: React.FC<Props> = props => {

    let values = props.values

    if (props.selectAllItem) {
        values = ['all', ...values]
    }

    const [value, setValue] = React.useState<string | null>(props.defaultValue);

    const handleValueChange = (event: React.ChangeEvent<{ value: string | null}>) => {
        setValue(event.target.value)
    };

    const style = {width: '100%'}

    const content = (
        <React.Fragment>
            <mui.InputLabel id={props.id}>{props.label}</mui.InputLabel>
            <mui.Select
                labelId={props.id}
                value={value}
                onChange={handleValueChange}
                variant="outlined"
                style={style}
            >
                {values.map(val => <mui.MenuItem key={val.trim()} value={val}>{val}</mui.MenuItem>)}
            </mui.Select>
        </React.Fragment>
    )

    return (
        <mui.FormGroup style={{marginBottom: 20}}>
            <OneColumnLayoutComponent content={content} />
        </mui.FormGroup>
    )
}

