/// <amd-dependency path="text!./AbonentChooserWidgetForm.html" name="template"/>
declare var template: string;

import component = require("../../../../component/component");
import bind = require("../../../../../import/bind");
import helper = require("../../../../helper");
import mod = require("./../../../../../swagger/mod");
import callback = require("./../../../../../lib/callback");

import {ListAbonentResponseModel, AbonentListRequestModel} from "./../../../../../swagger/application.cabinet.app.client.page.numbers.editWidget";
import editApi = require("./../../../../../swagger/application.cabinet.app.client.page.numbers.editWidget");
import {SORT, SORT_DIR} from "./../../../../../swagger/application.cabinet.app.client.page.numbers.editWidget";

import {AbonentChooserGrid} from "./AbonentChooserGrid";

export class AbonentChooserWidgetForm extends component.Dialog {
    
    @bind.uiField private closeButton : JQuery;
    @bind.uiField private selectedQuantityField : JQuery;
    @bind.uiBind private saveButton = new component.Button();
    @bind.uiBind private cancelButton = new component.Button();
    
    @bind.uiBind private abonentChooserGrid = new AbonentChooserGrid()
    
    private listener: (selectedRecordIds: mod.AbonentModel [],) => void
    private selectedValues: mod.AbonentModel [] = []
    
    constructor (listener : (selectedRecordIds: mod.AbonentModel []) => void, selectedValues: mod.AbonentModel []) {
        super(template);
        
        this.bind();
        
        this.listener = listener
        this.selectedValues = selectedValues
        
        this.attachCloseEvent(this.cancelButton.getElement(), this.closeButton);        
        
        this.abonentChooserGrid.onSelectionChange(() => {            
            this.refreshSelected();
        });
        
        this.setGridData() 
        
        this.saveButton.click(() => {
            this.listener(this.abonentChooserGrid.getSelection())
            this.close()
        })
    }
    
    private readonly setGridData = async () => {
         const abonentChooserGridValues = await this.getAbonentChooserGridValues()
         
        this.abonentChooserGrid.setData(abonentChooserGridValues)
        this.setSelectedValues()
    }
    
    private readonly setSelectedValues = () => {     
        if (this.selectedValues.length > 0) {
            let selection: number []= []
             this.selectedValues.map(value => {
                 if (this.checkSelectedValue(value)) {
                     selection.push(value.recordId)
                 }
            })
            
            this.abonentChooserGrid.setSelection(selection)
        }
    }
    
    private readonly getAbonentChooserGridValues = async () : Promise<mod.AbonentModel []> => {
        const values = await new Promise<ListAbonentResponseModel>((resolve, reject) => {
             editApi.getAbonentList(this.createAbonentListRequestModel(),  new callback.ErrorCallback(resolve))
        })
        
        return values.abonentList    
    }
    
    private readonly createAbonentListRequestModel = () : AbonentListRequestModel => {
        return {
            offset: 0,
            quantity: 100,
            recordIdClient: helper.getRecordIdClient(),
            filter: {
                name: null,
                ext: null,
                number: null,
                contract: null,
                department: null,
                web: null
            },
            sort: {
                sort: SORT.NAME,
                sortDir: SORT_DIR.ASC
            }
        }
    }   
     
    private readonly checkSelectedValue = (value: mod.AbonentModel) => {
        return this.abonentChooserGrid.getData().find(item => item.recordId == value.recordId)
    }
    
    private refreshSelected() {
        let selectedQuantity = this.abonentChooserGrid.getSelection().length;
        
        this.selectedQuantityField.text(helper.getChoosedAbonentQuantityLabel(selectedQuantity));
    }
}