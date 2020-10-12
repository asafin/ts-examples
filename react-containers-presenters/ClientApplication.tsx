import * as React from "react";
import { ComponentBase } from "../../../codebase/ComponentBase";
import { Route, Redirect, Switch } from "react-router-dom";
import { MenuItem } from "../../../components/menu/MainMenuComponent";
import { AuthenticatedComponentProps } from "../../../codebase/AuthenticatedComponentProps";
import { ClientApplicationProvider } from "../../../components/context/ClientApplicationContext";
import { HeaderComponent } from "../components/header/HeaderComponent";
import LiveStreamPage from "./online/LiveStreamPage";
import EventsLogPage from "./events/EventsLogPage";
import ProfilePage from "../profile/ProfilePage";
import ArchivePage from "./archive/ArchivePage";
import CatalogPage from "./catalog/CatalogPage";
import CameraListPage from "./cameraList/CameraListPage";
import CabinetPage from "./cabinet/CabinetPage";
import AddCameraFormPage from "./camera/AddCameraFormPage";
import EditCameraFormPage from "./camera/EditCameraFormPage";

export interface Props extends AuthenticatedComponentProps {
    recordIdClient: number
}

export class ClientApplication extends ComponentBase<Props> {    

    private menuItems: MenuItem [] = [];

    private userMenuItems: MenuItem [] = [
        {
            title: "Мой профиль",
            url: `/clients/${this.props.recordIdClient}/profile`,
            match: "profile"
        }
    ];

    constructor (props: Props){
        super (ClientApplication.name, props)
    }

    componentDidMount() {
    }

    private readonly getMenuItems= () => {
        this.menuItems = [];

        if (this.props.application.props.profile.system || this.props.application.props.profile.clients && this.props.application.props.profile.clients.length > 1) {
            this.menuItems.push({
                title: 'Клиенты',
                url: '/clients'
            })
        }

        let clientMenuItems : MenuItem [] = [
            {
                title: 'Онлайн',
                url: `/clients/${this.props.recordIdClient}/online`,
                match: 'online'
            },
            {
                title: 'Хроника',
                url: `/clients/${this.props.recordIdClient}/events`,
                match: 'events'
            },
            {
                title: 'Архив',
                url: `/clients/${this.props.recordIdClient}/archive`,
                match: 'archive'
            },
            {
                title: 'Каталог услуг',
                url: `/clients/${this.props.recordIdClient}/catalog`,
                match: 'catalog'
            },
            {
                title: 'Камеры',
                url: `/clients/${this.props.recordIdClient}/cameras`,
                match: 'cameras'
            },
            {
                title: 'Мой кабинет',
                url: `/clients/${this.props.recordIdClient}/cabinet`,
                match: 'cabinet'
            }
        ]

        this.menuItems = [...this.menuItems, ...clientMenuItems]

        return this.menuItems
    }

    private readonly getLiveStreamPage = () => <LiveStreamPage />

    private readonly getEventsPage = () => <EventsLogPage />

    private readonly getArchivePage = () => <ArchivePage />

    private readonly getCatalogPage = () => <CatalogPage />

    private readonly getCamerasPage = () => <CameraListPage />

    private readonly getCameraAddFormPage = () => <AddCameraFormPage />

    private readonly getCabinetPage = () => <CabinetPage />

    private readonly getProfilePage = () => <ProfilePage />

    public readonly render = () => {
        const componentClass = ClientApplication.name

        return (
            <ClientApplicationProvider value={this}>
                <div className={componentClass} >
                    <HeaderComponent 
                        items={this.getMenuItems()} 
                        onLogout={this.props.application.logout} 
                        notification={true} 
                        userMenuItems={this.userMenuItems}
                        profile={this.props.application.props.profile}
                        />
                    <div className="content-wrapper">
                        <Route path="/clients/:recordIdClient/events" render={this.getEventsPage} exact/>
                        <Route path="/clients/:recordIdClient/online" render={this.getLiveStreamPage}/>
                        <Route path="/clients/:recordIdClient/archive" render={this.getArchivePage} />  
                        <Route path="/clients/:recordIdClient/catalog" render={this.getCatalogPage} /> 
                        <Route path="/clients/:recordIdClient/cameras/add" render={this.getCameraAddFormPage} exact/> 
                        <Route path="/clients/:recordIdClient/cameras/:recordIdCamera/edit" render={({match}) => {
                            const {recordIdCamera} = match.params
                            return <EditCameraFormPage recordIdCamera={recordIdCamera}  />
                        }} />
                        <Route path="/clients/:recordIdClient/cabinet" render={this.getCabinetPage} /> 
                        <Route path="/clients/:recordIdClient/profile" render={this.getProfilePage} /> 
                        <Switch>
                            <Redirect from='/clients/:recordIdClient' to='/clients/:recordIdClient/cameras' exact/>
                            <Route path="/clients/:recordIdClient/cameras" render={this.getCamerasPage} exact/>
                        </Switch>                               
                    </div>                
                </div>
            </ClientApplicationProvider>
            
        )
    }
}