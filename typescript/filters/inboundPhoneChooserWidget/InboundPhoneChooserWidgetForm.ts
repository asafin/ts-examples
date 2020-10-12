/// <amd-dependency path="text!./InboundPhoneChooserWidgetForm.html" name="template"/>
declare var template: string;

import component = require("../../../../component/component");
import bind = require("../../../../../import/bind");
import helper = require("../../../../helper");
import cabinetApi = require("./../../../../../swagger/application.cabinet");
import mod = require("./../../../../../swagger/mod");
import callback = require("./../../../../../lib/callback");

import {InboundPhoneChooserGrid} from './InboundPhoneChooserGrid'

export class InboundPhoneChooserWidgetForm extends component.Dialog {
    
    @bind.uiField private closeButton : JQuery;
    @bind.uiField private selectedQuantityField : JQuery;
    @bind.uiBind private saveButton = new component.Button();
    @bind.uiBind private cancelButton = new component.Button();
    @bind.uiBind private inboundPhoneChooserGrid = new InboundPhoneChooserGrid();
    
    private listener: (selectedRecordIds: mod.InboundPhoneRouteModel[]) => void;
    
    private selectedValues: mod.InboundPhoneRouteModel [] = []
    
    constructor (listener : (selectedRecordIds: mod.InboundPhoneRouteModel []) => void, selectedValues: mod.InboundPhoneRouteModel []) {
        
        super(template);
        
        this.bind();
        
        this.listener = listener
        
        this.selectedValues = selectedValues
        
        this.attachCloseEvent(this.cancelButton.getElement(), this.closeButton);
        
        this.inboundPhoneChooserGrid.onSelectionChange(() => {
            this.refreshSelected();
        })
        
        this.setGridData()     
        
        this.saveButton.click(() => {
            this.listener(this.inboundPhoneChooserGrid.getSelection())
            this.close()
        })
    }
    
    private readonly setSelectedValues = () => {     
        if (this.selectedValues.length > 0) {
            let selection: number []= []
             this.selectedValues.map(value => {
                 if (this.checkSelectedValue(value)) {
                     selection.push(value.recordId)
                 }
            })
            
            this.inboundPhoneChooserGrid.setSelection(selection)
        }
    }
    
    private readonly checkSelectedValue = (value: mod.InboundPhoneRouteModel) => {
        return this.inboundPhoneChooserGrid.getData().find(item => item.recordId == value.recordId)
    }
    
    private readonly setGridData = async () => {
         const inboundPhoneSelectValues = await this.getInboundPhoneSelectValues()
         
        this.inboundPhoneChooserGrid.setData(inboundPhoneSelectValues)
        this.setSelectedValues()
    }
    
    private readonly getInboundPhoneSelectValues = async () : Promise<mod.InboundPhoneRouteModel[]> => {
        return await new Promise<mod.InboundPhoneRouteModel[]>((resolve, reject) => {
            cabinetApi.listInboundRoute(helper.getRecordIdClient(),  new callback.ErrorCallback(resolve))
        }) 
    }
    
    private refreshSelected() {
       let selectedQuantity = this.inboundPhoneChooserGrid.getSelection().length;

        this.selectedQuantityField.text(`Выбрано: ${helper.getMultichannelNumberQuantityLabel(selectedQuantity)}`);
    }
}