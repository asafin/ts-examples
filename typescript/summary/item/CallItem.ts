/// <amd-dependency path="text!./CallItem.html" name="template"/>

declare var template: string;

import lib = require("../../../../../lib/lib");
import bind = require("../../../../../import/bind");

import api = require("../../../../../swagger/application.cabinet.shared.stat");

export class CallItem extends bind.Composite {

    @bind.uiField private icon : JQuery;
    @bind.uiField private quantity : JQuery;
    @bind.uiField private description : JQuery;

    constructor(item: api.SummaryCallsItemModel) {
        super(template);

        this.bind();
        
        this.getElement().addClass('callsSummaryWidget__item')
        
        if (item.warning) {
            this.getElement().addClass('callsSummaryWidget__item_warning')
        }
        
        this.icon.addClass(this.getCallIconClass(item.label))
        this.description.text(this.getCallDescription(item.label))
        this.quantity.text(lib.formatDuration(item.quantity))
    }
    
    private readonly getCallIconClass = (label: api.SummaryCallsLabel) : string => {
        if (label == api.SummaryCallsLabel.ALL_CALLS) {
            return 'fas fa-phone-alt'
        }
        else if (label == api.SummaryCallsLabel.INB_CALLS) {
            return 'fas fa-sign-in-alt'
        }
        else if (label == api.SummaryCallsLabel.INB_MGKN_CALLS) {
            return 'fas fa-sign-in-alt'
        }
        else if (label == api.SummaryCallsLabel.OUT_CALLS) {
            return 'fas fa-sign-out-alt'
        }
        else if (label == api.SummaryCallsLabel.SUCCESS_CALLS) {
            return 'fas fa-sign-in-alt'
        }
        else if (label == api.SummaryCallsLabel.MISSING_CALLS) {
            return 'fas fa-phone-slash'
        }
        else if (label == api.SummaryCallsLabel.UNSUCCESS_CALLS) {
            return 'fas fa-phone-alt'
        }
    }
    
    private readonly getCallDescription = (label: api.SummaryCallsLabel) : string => {
        if (label == api.SummaryCallsLabel.ALL_CALLS) {
            return 'Всего вызовов совершено'
        }
        else if (label == api.SummaryCallsLabel.INB_CALLS) {
            return 'Входящих'
        }
        else if (label == api.SummaryCallsLabel.INB_MGKN_CALLS) {
            return 'Входящих на многоканальные'
        }
        else if (label == api.SummaryCallsLabel.OUT_CALLS) {
            return 'Исходящих'
        }
        else if (label == api.SummaryCallsLabel.SUCCESS_CALLS) {
            return 'Принятых'
        }
        else if (label == api.SummaryCallsLabel.MISSING_CALLS) {
            return 'Не принятых'
        }
        else if (label == api.SummaryCallsLabel.UNSUCCESS_CALLS) {
            return 'Не дозвонился'
        }
    }
}
