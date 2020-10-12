/// <amd-dependency path="text!./CallsSummaryWidget.html" name="template"/>

declare var template: string;

import lib = require("../../../../lib/lib");
import bind = require("../../../../import/bind");
import callback = require("../../../../lib/callback");

import component = require("../../../component/component");
import helper = require("../../../helper");

import api = require("../../../../swagger/application.cabinet.shared.stat");
import {CallItem} from './item/CallItem'
import {CallTimeItem} from './item/CallTimeItem'

export class CallsSummaryWidget extends bind.Composite {

    @bind.uiField private quantitySummary : JQuery;
    @bind.uiField private quantitySummaryCollapseBtn : JQuery;
    
    @bind.uiField private timeSummary : JQuery;
    @bind.uiField private timeSummaryCollapseBtn : JQuery;
    
    @bind.uiBind private exportButton = new component.Button();

    constructor() {
        super(template);

        this.bind();
        
        this.quantitySummaryCollapseBtn.click(()=> {
            this.quantitySummary.toggleClass("showSummary")
        })
        
        this.timeSummaryCollapseBtn.click(() => {
            this.timeSummary.toggleClass("showSummary")
        })
        
        this.exportButton.click(() => this.getFile())
        
        this.refresh()
    }
    
    private readonly getFile = async () => {
        const file = await new Promise<string>((resolve, _) => {
            api.summaryExportToXls(this.createBaseRequestModel(), new callback.ErrorCallback((file: string) => {
                if (file) {
                    resolve(file)
                }
            }));
        })

        helper.download(file, "Stat", "xls"); 
    }
    
    private readonly createBaseRequestModel = () : api.BaseRequestModel => {
        let request = new api.BaseRequestModel()
        
        return request
    }
    
    public readonly refresh = async () => {
        const values = await this.getCallListtValues()
        
        this.renderCalls(items.calls)
        this.renderCallTime(items.callTime)
    }
    
    private readonly renderCalls = (calls: api.SummaryCallsItemModel []) => {
        //TODO
    }
    
    private readonly renderCallTime = (callTime: api.SummaryCallsTimeItemModel []) => {
        //TODO
    }
    
    private readonly getCallListtValues = async () : Promise<api.SummaryCallsResponseModel> => {        
        return new Promise<api.SummaryCallsResponseModel>((resolve, reject) => {
            api.getSummaryCalls(this.createBaseRequestModel(), new callback.ErrorCallback(resolve))
        })
    } 
}

const calls : api.SummaryCallsItemModel [] = [
    {
        label: api.SummaryCallsLabel.ALL_CALLS,
        quantity: 123456,
        warning: false
    },
    {
        label: api.SummaryCallsLabel.INB_CALLS,
        quantity: 123456,
        warning: false
    },
    {
        label: api.SummaryCallsLabel.INB_MGKN_CALLS,
        quantity: 123456,
        warning: false
    },
    {
        label: api.SummaryCallsLabel.OUT_CALLS,
        quantity: 123456,
        warning: true
    },
    {
        label: api.SummaryCallsLabel.MISSING_CALLS,
        quantity: 123456,
        warning: false
    },
    {
        label: api.SummaryCallsLabel.UNSUCCESS_CALLS,
        quantity: 123456,
        warning: false
    }
]

const callTime : api.SummaryCallsTimeItemModel [] = [
    {
        label: api.SummaryCallsTimeLabel.ALL_TIME,
        quantity: 123456,
        warning: false
    },
    {
        label: api.SummaryCallsTimeLabel.TIME_INB,
        quantity: 123456,
        warning: false
    },
    {
        label: api.SummaryCallsTimeLabel.TIME_OUT,
        quantity: 123456,
        warning: false
    },
    {
        label: api.SummaryCallsTimeLabel.AVERAGE_TIME,
        quantity: 123456,
        warning: true
    },
    {
        label: api.SummaryCallsTimeLabel.AVERAGE_TIME_INB,
        quantity: 123456,
        warning: true
    },
    {
        label: api.SummaryCallsTimeLabel.AVERAGE_TIME_OUT,
        quantity: 123456,
        warning: false
    }
]

const items : api.SummaryCallsResponseModel = {
    calls,
    callTime
}