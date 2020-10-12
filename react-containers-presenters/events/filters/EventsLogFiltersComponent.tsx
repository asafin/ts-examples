import * as React from "react";
import * as rx from "rxjs/Rx";
import {RecordSelectComponent } from "../../../../../components/select/SelectComponent";
import { DateRangePickerComponent } from "../../../../../components/dateRangePicker/DateRangePickerComponent";
import { AccordionItemComponent } from "../../../../../components/accordion/AccordionItemComponent";
import { RecordModel } from "../../../../../codebase/RecordModel";
import { ServiceSelectComponent, ServiceModel } from "../../components/servicesSelect/ServicesSelectComponent";

export interface Props {
    cameraList: RecordModel [],
    selectedCameraRecordId:  number,
    dateRangeSelected: number [],
    servicesList: ServiceModel [],
    selectedServiceItem: ServiceModel,
    dateRangelistener: (dateRangeSelected: number []) => rx.Observable<void>,
    cameraSelectListener: (selectedCameraRecordId: number) => void,
    serviceSelectListener: (service: ServiceModel) => void
}

export const EventsLogFiltersComponent : React.FC<Props> = props =>  {
    const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

    window.addEventListener('resize', () => {
        setWindowWidth(window.innerWidth)
    });

    const renderFilterItems = () => {
        return (
            <div className="eventsLog-filters">
                <DateRangePickerComponent dateRangelistener={props.dateRangelistener} dateRangeSelected={props.dateRangeSelected} />
                <ServiceSelectComponent 
                        items={props.servicesList}
                        listener={props.serviceSelectListener}
                        selectedItem={props.selectedServiceItem}
                        chooseAllTitle='Все услуги'                    
                    />
                <RecordSelectComponent 
                    items={props.cameraList}
                    listener={props.cameraSelectListener}
                    selectedItemId={props.selectedCameraRecordId}
                    chooseAllTitle='Все камеры'                 
                />
            </div>
        )
    }

    const renderWrappedFilterItems = () => {
        return (
            <AccordionItemComponent title="Фильтры">
                {renderFilterItems()}
            </AccordionItemComponent>
        );
    }

    const renderFilters = ()=> {
        if (windowWidth > 1024) {
            return renderFilterItems()
        }
        else {
            return renderWrappedFilterItems()
        }
    }

    return renderFilters();
}
