import * as React from "react";
import {AuthenticatedApplication} from "../../../AuthenticatedApplication"
import {GetClientGlossariesListResponseModel, ClientGlossaryModel} from "../../../services/types"
import {OneColumnLayoutComponent} from "../../layout/OneColumnLayoutComponent"
import * as mui from "@material-ui/core"
import { withAuthenticatedApplicationContext } from "../../../services/context/WithAuthenticatedApplicationContext";


export interface Props {
    application: AuthenticatedApplication,
    onChange:  (event: React.ChangeEvent<HTMLInputElement>, val: number, indexOf: number) => void,
    selectedItems: number []
}

export interface State {
    inProgress: boolean,
    glossaryList: ClientGlossaryModel []
}

class GlossarySelectComponent extends React.Component<Props, State> {

    private isMount: boolean = false;

    constructor(props: Props) {
        super(props);

        this.state = {
            inProgress: false,
            glossaryList: []
        }
    }

    componentDidMount() {
        this.isMount = true;
        this.refresh();
    }

    private readonly refresh = () => this.setState({
        inProgress: true
    }, () => this.getGlossaryList())

    private readonly getGlossaryList = () => this.props.application.client.getGlossaryList()
        .then((response: GetClientGlossariesListResponseModel) => {
            if (response.items && response.items.length > 0) {
                this.parseGetClientGlossariesListResponse(response.items)
            }else {
                this.setState({inProgress: false})
            }
        }, (error: any) => {
            console.log('getAbonentsList error', error)
        })

    private readonly parseGetClientGlossariesListResponse = (glossaryList: ClientGlossaryModel []) => this.isMount && this.setState({glossaryList, inProgress: false})    

    private readonly renderItemLabel = (item: ClientGlossaryModel) => {
        const indexOf = this.props.selectedItems.indexOf(item.recordId)
        const checkbox = <mui.Checkbox
            checked={indexOf >= 0}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.props.onChange(event, item.recordId, indexOf)}
            color="secondary"
            size="small"
        />

        return <mui.FormControlLabel
            control={checkbox}
            label={item.name}
            key={JSON.stringify(item)}
            style={{display: 'block', width: '100%'}}
        />
    }

    componentWillUnmount = () => {
        this.isMount = false;
    }

    render() {

        const style = {borderRadius: 4, border: '1px solid rgba(40,40,40, 0.2)', padding: '5px 0', height: 165, overflow: 'auto'}

        const content = (
            <div className='GlossarySelectComponent'>
                <mui.InputLabel>Список словарей</mui.InputLabel>
                <div style={style}>
                    {this.state.glossaryList.map(item => this.renderItemLabel(item))}
                </div>
            </div>
        )

        if (this.state.glossaryList.length > 0) {
            return (
                <mui.FormGroup>
                    {content}
                </mui.FormGroup>
            )
        }
        else {
            return (
                <div></div>
            )
        }
    }
}

export default withAuthenticatedApplicationContext(GlossarySelectComponent)