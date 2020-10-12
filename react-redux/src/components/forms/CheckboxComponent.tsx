import * as React from "react";
import * as mui from "@material-ui/core";

export interface Props {
    label: string,
    onChange: () => void,
    defaultValue: boolean
}

export const CheckboxComponent : React.FC<Props> = props => {
    const [state, setState] = React.useState<boolean>(props.defaultValue)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState(event.target.checked)
        props.onChange();
    }

    return (
        <mui.FormGroup style={{marginBottom: 20}}>
            <mui.Grid container>
                <mui.Grid item xs={12}>
                    <mui.FormControlLabel
                        control={
                            <mui.Checkbox
                                checked={state}
                                onChange={handleChange}
                                color="secondary"
                                size="small"
                            />
                        }
                        label={props.label}
                    />
                </mui.Grid>
            </mui.Grid>
        </mui.FormGroup>
    )
}
