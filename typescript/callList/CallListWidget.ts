/// <amd-dependency path="text!./CallListWidget.html" name="template"/>
declare var template: string;

import bind = require("../../../../import/bind");

import component = require("../../../component/component");
import {Paginator} from "../../../component/Paginator";
import helper = require("../../../helper");
import {CallListGrid} from "./CallListGrid";
import callback = require("./../../../../lib/callback")
import enums = require("../../../../swagger/enums");
import api = require("../../../../swagger/application.cabinet.shared.stat");

export class CallListWidget extends bind.Composite {

    @bind.uiBind
    private exportButton = new component.Button();

    @bind.uiBind
    public paginator = new Paginator();

    private sortField = api.ListRequestSortField.DATE;
    private sortDirection = enums.SORT_DIRECTION.DESC;
   
    @bind.uiBind private callListGrid = new CallListGrid()

    constructor() {
        super(template);

        this.bind();
        
        this.init();
        
    }

    private init = () => {

        this.paginator.listen(() => {
            this.refresh();
        });

        this.exportButton.click(() => this.getFile());

        //this.refresh();
    }

    public refresh = async () => {        
        const model = await this.getCallListValues()
        
        this.paginator.update(model.totalPageQuantity);
    }
    
    private readonly getFile = async () => {
        const file = await new Promise<string>((resolve, reject) => {
            api.callsListExportToXls(this.createCallListExportRequestModel(), new callback.ErrorCallback((file: string) => {
                if (file) {
                    resolve(file)
                }
            }));
        })

        helper.download(file, "Stat", "xls"); 
    }
    
    private readonly getCallListValues = async () : Promise<api.CallListResponseModel> => {        
        return new Promise<api.CallListResponseModel>((resolve, reject) => {
            api.getCallsList(this.createCallListRequestModel(), new callback.ErrorCallback(resolve))
        })
    } 

    private createCallListRequestModel = (): api.CallListRequestModel => {
        let result = new api.CallListRequestModel();

        result.page = this.paginator.getPage();
        result.recordIdClient = helper.getRecordIdClient();
        result.pageSize = this.paginator.getPageSize();
        result.sortField = this.sortField;
        result.sortDirection = this.sortDirection;

        return result;
    }
    
    private createCallListExportRequestModel = () : api.CallListExportRequestModel=> {
        let result = new api.CallListExportRequestModel()
        
        return result
    }
}
