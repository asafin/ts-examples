import * as React from "react";
import 'date-fns';
import * as mui from "@material-ui/core";
import {OneColumnLayoutComponent} from "../../layout/OneColumnLayoutComponent"

export interface Props {
    id: string,
    label: string,
    list: string [],
    onChange: (selectedValues: string []) => void,
    defaultValues: string []
}

export const NativeSelectTextComponent: React.FC<Props> = props => {

    const componentName = "SelectComponent"

    const [list, setList] = React.useState<string []>(props.defaultValues);


    const handleNativeSelect = (event: React.ChangeEvent<{ value: string }>) => {
        const { options } = event.target as HTMLSelectElement;
        const values: string[] = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
            if (options[i].selected) {
                values.push(options[i].value);
            }
        }

        setList(values)
        props.onChange(values)
    };

    const style = {width: '100%'}

    const content = (
        <React.Fragment>
            <mui.InputLabel htmlFor={props.id}>{props.label}</mui.InputLabel>
            <mui.Select
                multiple
                native
                value={list}
                style={style}
                variant="outlined"
                onChange={handleNativeSelect}
                inputProps={{
                    id: props.id,
                }}
            >
                {props.list.map(val => <option key={val.trim()} value={val}>{val}</option>)}
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

