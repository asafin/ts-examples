import * as React from "react";
import * as mui from "@material-ui/core";
import {Redirect, Route, Switch} from "react-router-dom"
import {Profile} from "./services/Profile"
import {WebClient} from "./services/WebClient"
import {AuthenticatedApplicationProvider} from "./services/context/AuthenticatedApplicationContext"
import { GetUserStatusResponseModel } from "./services/types";
import MuiAlert, { Color } from '@material-ui/lab/Alert'
import PageNavigationBar from "./components/navBar/PageNavigationBar";
import { MainNavigationBar } from "./components/navBar/MainNavigationBar";
import CallsListPageComponent from "./pages/callsList/CallsListPageComponent";
import ProfilePageComponent from "./pages/profile/ProfilePageComponent";
import AbonentsSettingsPageComponent from "./pages/abonents/AbonentsSettingsPageComponent";
import GlossaryListPageComponent from "./pages/glossary/GlossaryListPageComponent";

export interface Props {
    profile : Profile
}

export interface State {
}

interface JivoCustomDataModel {
    title: string,
    content: string,
    link: string
}

export class AuthenticatedApplication extends React.Component<Props> {

    public readonly client = new WebClient(this.props.profile.token)

    constructor(props: Props) {
        super(props);
    }

    componentDidMount = () => {
        this.setJivoSiteCustomData();
    }

    private readonly setJivoSiteCustomData = () => {
    
    }

    private readonly abonentsList = () => <CallsListPageComponent />

    private readonly profilePage = () => <ProfilePageComponent />

    private readonly abonentsSettings = () => <AbonentsSettingsPageComponent />

    private readonly clientGlossaryListPage = () => <GlossaryListPageComponent />

    render() {
        const pageClass = "AuthenticatedApplication"

        return (
            <AuthenticatedApplicationProvider value={this}>
                <div className={pageClass}>
                    <PageNavigationBar />
                    <MainNavigationBar />
                    <div className={`${pageClass}__content`}>
                        <Route component={this.abonentsList} path="/" exact />
                        <Route component={this.abonentsSettings} path="/staff" exact />
                        <Route component={this.profilePage} path="/profile" />
                        <Route component={this.clientGlossaryListPage} path="/glossary" />
                        <Switch>
                            <Redirect from='/redirect' to='/' exact/>
                        </Switch>
                    </div>                    
                </div>
            </AuthenticatedApplicationProvider>
        );
    }
}
