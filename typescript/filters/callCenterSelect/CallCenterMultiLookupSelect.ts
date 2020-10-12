
/// <amd-dependency path="text!./CallCenterMultiLookupSelect.html" name="template"/>
declare var template: string;

import bind = require("../../../../../import/bind");
import helper = require("./../../../../helper")
import cabinetApi = require("./../../../../../swagger/application.cabinet")
import mod = require("./../../../../../swagger/mod");
import callback = require("./../../../../../lib/callback")
import {MultiLookupModelSelect} from "../../../../form/client/abonent/profile/select/MultiLookupModelSelect"
  

export class CallCenterMultiLookupSelect extends bind.Composite {
    
    @bind.uiField private callCenterSelectWrapper : JQuery;
    
    private callCenterSelect : MultiLookupModelSelect;
    
    public readonly getSelection = () => this.callCenterSelect.getSelection()
    
    public readonly clearSelection = () => this.callCenterSelect.clearSelection()
    
    constructor() {
        super(template);

        this.bind();
        
        this.createCallCenterSelect();
    }
    
    private readonly createCallCenterSelect = async () => {
        const callCenterSelectValues = await this.getCallCenterSelectValues()
            
        this.callCenterSelect = new MultiLookupModelSelect(callCenterSelectValues, {onSelectionChanged: () => {}})            
        
        this.callCenterSelectWrapper.append(this.callCenterSelect.getElement())
    }
    
    private readonly getCallCenterSelectValues = async () : Promise<mod.LookupModel []> => {        
        return new Promise<mod.LookupModel []>((resolve, reject) => {
            cabinetApi.listCallCenter(helper.getRecordIdClient(), new callback.ErrorCallback(resolve))
        })
    }   
}
