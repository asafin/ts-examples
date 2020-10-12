/// <amd-dependency path="text!./DepartmentMultiLookupSelect.html" name="template"/>
declare var template: string;

import bind = require("../../../../../import/bind");

import helper = require("./../../../../helper");
import cabinetApi = require("./../../../../../swagger/application.cabinet");
import mod = require("./../../../../../swagger/mod");
import callback = require("./../../../../../lib/callback");
import {MultiLookupModelSelect} from "../../../../form/client/abonent/profile/select/MultiLookupModelSelect";
  

export class DepartmentMultiLookupSelect extends bind.Composite {

    @bind.uiField private departmentSelectWrapper : JQuery;
    
    private departmentSelect : MultiLookupModelSelect;
    
    public readonly getSelection = () => this.departmentSelect.getSelection()
    
    public readonly clearSelection = () => this.departmentSelect.clearSelection()
    
    constructor() {
        super(template);

        this.bind();        
        
        this.createDepartmentSelect();
    }
    
    private readonly createDepartmentSelect = async () => {
        const departmentSelectValues = await this.getDepartmentSelectValues()
        
        this.departmentSelect = new MultiLookupModelSelect(departmentSelectValues, {onSelectionChanged: () => {}})
        
        this.departmentSelectWrapper.append(this.departmentSelect.getElement())
    }    
    
    private readonly getDepartmentSelectValues = async () : Promise<mod.LookupModel []> => {        
        return new Promise<mod.LookupModel []>((resolve, reject) => {
            cabinetApi.listDepartment(helper.getRecordIdClient(), new callback.ErrorCallback(resolve))
        })
    }
}
