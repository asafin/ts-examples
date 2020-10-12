/// <amd-dependency path="text!./CallTimeItem.html" name="template"/>

declare var template: string;

import lib = require("../../../../../lib/lib");
import bind = require("../../../../../import/bind");

import api = require("../../../../../swagger/application.cabinet.shared.stat");

export class CallTimeItem extends bind.Composite {

    @bind.uiField private icon : JQuery;
    @bind.uiField private quantity : JQuery;
    @bind.uiField private description : JQuery;

    constructor(item: api.SummaryCallsTimeItemModel) {
        super(template);

        this.bind();
        
        this.getElement().addClass('callsSummaryWidget__item')
        
        if (item.warning) {
            this.getElement().addClass('callsSummaryWidget__item_warning')
        }
        
        this.icon.addClass(this.getCallTimeIconClass(item.label))
        this.description.text(this.getCallTimeDescription(item.label))
        this.quantity.text(lib.formatDuration(item.quantity))
    }
    
    private readonly getCallTimeIconClass = (label: api.SummaryCallsTimeLabel) : string => {
        if (label == api.SummaryCallsTimeLabel.ALL_TIME) {
            return 'fas fa-phone-alt'
        }
        else if (label == api.SummaryCallsTimeLabel.TIME_INB) {
            return 'fas fa-sign-in-alt'
        }
        else if (label == api.SummaryCallsTimeLabel.TIME_OUT) {
            return 'fas fa-sign-out-alt'
        }
        else if (label == api.SummaryCallsTimeLabel.AVERAGE_TIME) {
            return 'fas fa-phone-alt'
        }
        else if (label == api.SummaryCallsTimeLabel.AVERAGE_TIME_INB) {
            return 'fas fa-sign-in-alt'
        }
        else if (label == api.SummaryCallsTimeLabel.AVERAGE_TIME_OUT) {
            return 'fas fa-sign-out-alt'
        }
    }
    
    private readonly getCallTimeDescription = (label: api.SummaryCallsTimeLabel) : string => {
        if (label == api.SummaryCallsTimeLabel.ALL_TIME) {
            return ''
        }
        else if (label == api.SummaryCallsTimeLabel.TIME_INB) {
            return ''
        }
        else if (label == api.SummaryCallsTimeLabel.TIME_OUT) {
            return ''
        }
        else if (label == api.SummaryCallsTimeLabel.AVERAGE_TIME) {
            return ''
        }
        else if (label == api.SummaryCallsTimeLabel.AVERAGE_TIME_INB) {
            return ''
        }
        else if (label == api.SummaryCallsTimeLabel.AVERAGE_TIME_OUT) {
            return ''
        }
    }
}
