/// <amd-dependency path="text!./StatPageListWidgetFilter.html" name="template"/>
declare var template: string;

import bind = require("../../../../import/bind");

import component = require("../../../component/component");
import helper = require("./../../../helper");
import {DurationSelect} from "../../../widget/select/DurationSelect";
import {DirectionSelect} from "../../../widget/select/DirectionSelect";

import mod = require("./../../../../swagger/mod");
import {CommentSelect} from "../../../widget/select/CommentSelect";
import form = require("./../../../form");
import api = require("../../../../swagger/application.cabinet.shared.stat");
import {PAGE} from "./../StatPageListWidget";
import {DepartmentMultiLookupSelect} from "./departmentSelect/DepartmentMultiLookupSelect"
import {CallCenterMultiLookupSelect} from "./callCenterSelect/CallCenterMultiLookupSelect"
import {CallStatusSelect} from "./callStatus/CallStatusSelect"
  

export class StatPageListWidgetFilter extends bind.Composite {
    
    private listener: () => void;

    @bind.uiBind private departmentSelect = new DepartmentMultiLookupSelect();
    @bind.uiBind private callCenterSelect = new CallCenterMultiLookupSelect();
      
    @bind.uiField private abonentChooserBtn : JQuery;
    @bind.uiField private inboundPhonesChooserBtn : JQuery;
    
    @bind.uiBind private directionSelect = new DirectionSelect();
    @bind.uiBind private durationSelect = new DurationSelect();
    @bind.uiBind private statusSelect = new CallStatusSelect();    
    @bind.uiBind private commentSelect = new CommentSelect();  
    
    @bind.uiBind private setFilterBtn = new component.Button();    
    @bind.uiBind private resetFilterBtn = new component.Button();
    
    @bind.uiField private directionSelectWrapper: JQuery;
    @bind.uiField private durationSelectWrapper: JQuery;
    @bind.uiField private statusSelectWrapper: JQuery;
    @bind.uiField private commentSelectWrapper: JQuery;
    
    private selectedAbonents : mod.AbonentModel [] = []
    private selectedInboundPhones : mod.InboundPhoneRouteModel [] = []
    
    public readonly setFilterFields = (page: PAGE) => {
        if (page == PAGE.CALL_LOG) {
            this.directionSelectWrapper.show()
            this.durationSelectWrapper.show()
            this.statusSelectWrapper.show()
            this.commentSelectWrapper.show()
        }
        else {
            this.directionSelectWrapper.hide()
            this.durationSelectWrapper.hide()
            this.statusSelectWrapper.hide()
            this.commentSelectWrapper.hide()
        }
    }
    
    public readonly getFilterValues = () : api.FilterModel => {
        return {
            departments: this.departmentSelect.getSelection().map(item => item.recordId),
            callCenter: this.callCenterSelect.getSelection().map(item => item.recordId),
            abonents: this.selectedAbonents.map(item => item.recordId),
            inboundPhones: this.selectedInboundPhones.map(item => item.recordId),
            direction: this.directionSelect.getValue(),
            duration: this.durationSelect.getValue(),
            status: this.statusSelect.getValue(),
            comment: this.commentSelect.getValue()
        }
    }
    
    constructor(listener: () => void) {
        super(template);

        this.bind();
        
        this.listener = listener
        
        this.directionSelect.setSmall(true);
        this.durationSelect.setSmall(true);
        this.statusSelect.setSmall(true);
        this.commentSelect.setSmall(true);
        
        this.abonentChooserBtn.click(()=> {
            form.showAbonentChooserWidgetForm((selectedAbonents: mod.AbonentModel []) => {
                this.selectedAbonents = selectedAbonents;
                this.refreshAbonentsChooserBtnTitle()
            }, this.selectedAbonents)
        })
        
        this.inboundPhonesChooserBtn.click(()=> {
            form.showInboundPhoneChooserWidgetForm((selectedInboundPhones: mod.InboundPhoneRouteModel []) => {
                this.selectedInboundPhones = selectedInboundPhones;
                this.refreshInboundPhoneChooserBtnTitle();
            }, this.selectedInboundPhones)
        })
        
        this.refreshAbonentsChooserBtnTitle();
        this.refreshInboundPhoneChooserBtnTitle();
        
        this.setFilterBtn.click(() => {
            this.listener()
        })
        
        this.resetFilterBtn.click(() => {
            this.resetFilter()
            this.listener()
        })
    }
    
    private readonly resetFilter = () => {
        this.departmentSelect.clearSelection()
        this.callCenterSelect.clearSelection()
        this.selectedAbonents = []
        this.selectedInboundPhones = []
        this.directionSelect.setValue(null)
        this.durationSelect.setValue(null)
        this.statusSelect.setValue(null)
        this.commentSelect.setValue(null)
        
        this.refreshInboundPhoneChooserBtnTitle()
        this.refreshAbonentsChooserBtnTitle()
    }
    
    private readonly refreshInboundPhoneChooserBtnTitle = () => {
        this.inboundPhonesChooserBtn.text(`Выбрано ${helper.getSimpleNumberQuantityLabel(this.selectedInboundPhones.length)}`);
    }
    
    private readonly refreshAbonentsChooserBtnTitle = () => {
        this.abonentChooserBtn.text(helper.getChoosedAbonentQuantityLabel(this.selectedAbonents.length));
    }    
}
