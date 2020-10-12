/// <amd-dependency path="text!./StatPageListWidget.html" name="template"/>
declare var template: string;

import bind = require("../../../import/bind");

import component = require("../../component/component");
import {TabBar} from "./../../component/TabBar";
import {CallsSummaryWidget} from "./summary/CallsSummaryWidget";
import {CallListWidget} from "./callList/CallListWidget";

import api = require("../../../swagger/application.cabinet.shared.stat");
import {DateChooser} from './filters/dateChooser/DateChooser'
import {RatingListWidget} from './ratingList/RatingListWidget'
import {StatPageListWidgetFilter} from './filters/StatPageListWidgetFilter';

export enum PAGE {
    STATISTICS = <any>"STATISTICS",
    CALL_LOG = <any>"CALL_LOG",
    RATINGS = <any>"RATINGS"
}    

export class StatPageListWidget extends bind.Composite {
    
    @bind.uiBind
    private showFilter = new component.Button();
    
    @bind.uiField private contentWrapper : JQuery;
   
    @bind.uiBind private filter = new StatPageListWidgetFilter(() => this.refresh());
    @bind.uiBind private dateFilter = new DateChooser()
    
    @bind.uiBind private pageBar = new TabBar<PAGE>((feature: PAGE) => {
        if (feature == PAGE.STATISTICS) {
            return "Статистика";
        }
        else if (feature == PAGE.CALL_LOG) {
            return "Журнал звонков";
        }
        else {
            return "Рейтинг сотрудников";
        }
    });
    
    @bind.uiField private statistics : JQuery;
    @bind.uiField private callLog : JQuery;
    @bind.uiField private rating : JQuery;    
        
    @bind.uiBind private ratingListWidget = new RatingListWidget()
    @bind.uiBind private callListWidget = new CallListWidget()
    @bind.uiBind private summaryWidgets = new CallsSummaryWidget();

    constructor() {
        super(template);

        this.bind();
        
        this.showFilter.click(() => {
            this.contentWrapper.toggleClass("showFilters")
        })
        
        this.pageBar.addItem(PAGE.STATISTICS);
        this.pageBar.addItem(PAGE.CALL_LOG);
        this.pageBar.addItem(PAGE.RATINGS);        
        this.pageBar.onSelect(()=> this.onPageChange());        
        this.pageBar.setSelected(PAGE.STATISTICS)
        
        this.dateFilter.setListener(() => this.refresh())
    }
    
    private readonly onPageChange = () => {
        this.filter.setFilterFields(this.pageBar.getSelection())
        
        if (this.pageBar.getSelection() == PAGE.STATISTICS) {
            this.statistics.show()
            this.callLog.hide()
            this.rating.hide()
        }
        else if (this.pageBar.getSelection() == PAGE.CALL_LOG) {
            this.statistics.hide()
            this.callLog.show()
            this.rating.hide()
        }
        else {
            this.statistics.hide()
            this.callLog.hide()
            this.rating.show()
        }    
    }
    
    private readonly refresh = () => {
        console.log(this.getStatPageWidgetFilterModel())
    }
    
    private readonly getStatPageWidgetFilterModel = (): api.FilterWithDateModel => ({
        ...this.filter.getFilterValues(), 
        from: this.dateFilter.getStartString(),
        to: this.dateFilter.getEndString()
    })
}
