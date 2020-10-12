/// <amd-dependency path="text!./DateChooser.html" name="template"/>
/// <amd-dependency path="text!./DatePeriodChooser.html" name="datePeriodChooserTemplate"/>
/// <amd-dependency path="text!./DatePeriodPopover.html" name="datePeriodPopoverTemplate"/>
declare var template: string;
declare var datePeriodPopoverTemplate: string;
declare var datePeriodChooserTemplate: string;

import component = require("../../../../component/component");
import {Select} from "./../../../../component/Select";
import lib = require("../../../../../lib/lib");
import bind = require("../../../../../import/bind");
import helper = require("../../../../helper");
import {DATE_PERIOD} from "../../../../component/component";
import {TabBar} from "./../../../../component/TabBar";
import enums = require("../../../../../swagger/enums");

export class DateChooser extends bind.Composite {
    
    @bind.uiBind private dateRangeTab = new TabBar<DATE_PERIOD>((feature: DATE_PERIOD) => {
        if (feature == DATE_PERIOD.TODAY) {
            return "Сегодня";
        }
        else if (feature == DATE_PERIOD.YESTERDAY) {
            return "Вчера";
        }
        else if (feature == DATE_PERIOD.WEEK) {
            return "Неделя";
        }
        else if (feature == DATE_PERIOD.MONTH) {
            return "Месяц";
        }
        else if (feature == DATE_PERIOD.YEAR) {
            return "Год";
        }
        else {
            return "Всё время";
        }
    });
    
    @bind.uiField private dateFilterDataDisplay : JQuery;
    @bind.uiField private dateFilter : JQuery;
    
    private datePeriodPopover: DatePeriodPopover = new DatePeriodPopover();
    
    private listener: () => void = null
    
    public setListener = (listener: () => void) => this.listener = listener
    
    constructor () {
        super(template);
        this.bind();
        
        this.setTabs()
        this.dateRangeTab.onSelect(() => {
            this.dateRangeChange()
        })
        this.dateRangeTab.setSelected(DATE_PERIOD.TODAY)
        
        this.dateFilter.click(()=> {
            var dateStart = this.getStart();
            var dateEnd = this.getEnd();
            this.datePeriodPopover = new DatePeriodPopover();
            
            this.datePeriodPopover.getDatePeriodChooser().setPeriod(this.dateRangeTab.getSelection())
            
            this.datePeriodPopover.setListener(() => {
                if (this.datePeriodPopover.getDatePeriodChooser().getPeriod() == null) {           
                    this.dateRangeTab.clearSelected()
                    this.setDateFilterFieldText()
                    this.getTime()
                    this.listener()
                }            
            })
            
            this.datePeriodPopover.getDatePeriodChooser().setStart (dateStart);
            this.datePeriodPopover.getDatePeriodChooser().setEnd (dateEnd);

            component.showPopover(this.dateFilter, enums.POSITION.RIGHT, false, this.datePeriodPopover);
        })
    }
    
    private readonly setTabs = () => {
        this.dateRangeTab.addItem(DATE_PERIOD.TODAY)
        this.dateRangeTab.addItem(DATE_PERIOD.YESTERDAY)
        this.dateRangeTab.addItem(DATE_PERIOD.WEEK)
        this.dateRangeTab.addItem(DATE_PERIOD.MONTH)
        this.dateRangeTab.addItem(DATE_PERIOD.YEAR)
        this.dateRangeTab.addItem(DATE_PERIOD.ALL)
    }
    
    private readonly dateRangeChange = () => {
        if (this.datePeriodPopover != null) {
            this.datePeriodPopover.getDatePeriodChooser().setPeriod(this.dateRangeTab.getSelection())
        }        
        this.setDateFilterFieldText()   
        
        if (this.listener) {
            this.listener()
        }
    }
    
    private readonly setDateFilterFieldText = () => {
        if (this.dateRangeTab.getSelection() == DATE_PERIOD.ALL) {
            this.dateFilter.text("Период: все время");
        }
        else if (this.dateRangeTab.getSelection() == DATE_PERIOD.TODAY) {
            this.dateFilter.text("Период: сегодня");
        }
        else if (this.dateRangeTab.getSelection() == DATE_PERIOD.YESTERDAY) {
            this.dateFilter.text("Период: вчера");
        }
        else if (this.dateRangeTab.getSelection() == DATE_PERIOD.WEEK) {
            this.dateFilter.text("Период: неделя");
        }
        else if (this.dateRangeTab.getSelection() == DATE_PERIOD.MONTH) {
            this.dateFilter.text("Период: месяц");
        }
        else if (this.dateRangeTab.getSelection() == DATE_PERIOD.YEAR) {
            this.dateFilter.text("Период: год");
        }
        else {
            this.dateFilter.text("Период: фильтр");
        }
        
        this.getTime()
    }
    
    private getTime = () => {
        this.dateFilterDataDisplay.text('')
                
        if (this.getTimelessStartString()) {
            let dateFrom = lib.formatDateddMMyyyy(
                lib.toDateFromString(this.getTimelessStartString(), false)
            )
            
            if (this.getTimelessEndString()) {
                let dateTo = lib.formatDateddMMyyyy(
                    lib.toDateFromString(this.getTimelessEndString(), false)
                )
                this.dateFilterDataDisplay.text(`${dateFrom} - ${dateTo}`)
            }
            else {
                this.dateFilterDataDisplay.text(`${dateFrom}`)
            }
        }            
    }
    
    public getStart () : Date {
        if (this.datePeriodPopover != null) {
            return this.datePeriodPopover.getDatePeriodChooser().getStart();
        }
        else {
            return null;
        }
    }

    public getEnd () : Date {
        if (this.datePeriodPopover != null) {
            return this.datePeriodPopover.getDatePeriodChooser().getEnd();
        }
        else {
            return null;
        }
    }

    public getTimelessStartString () : string {
        var result: Date = lib.createTimeZoneLessDate(this.getStart());

        if (result == null) {
            return null
        }
        else {
            return result.getTime() + "";
        }
    }

    public getStartString () : string {
        var result: Date = this.getStart();

        if (result == null) {
            return null
        }
        else {
            return result.getTime() + "";
        }
    }

    public getTimelessEndString () : string {
        var result: Date = lib.createTimeZoneLessDate(this.getEnd());

        if (result == null) {
            return null
        }
        else {
            return result.getTime() + "";
        }
    }

    public getEndString () : string {
        var result: Date = this.getEnd();

        if (result == null) {
            return null
        }
        else {
            return result.getTime() + "";
        }
    }
}

class DatePeriodPopover extends bind.Composite implements component.PopoverContent {

    @bind.uiBind
    private datePeriodChooser = new DatePeriodChooser ();

    @bind.uiBind
    private chooseButton = new component.Button ();

    @bind.uiBind
    private cancelButton = new component.Button ();

    private listener : () => void;

    public getDatePeriodChooser () {
        return this.datePeriodChooser;
    }

    constructor () {
        super(datePeriodPopoverTemplate);

        this.bind();
    }

    public shown(popover: component.Popover) {
        popover.attachCloseEvent(this.cancelButton.getElement());
        this.chooseButton.click( () => {
            popover.close() ;
            this.listener ();
        });
    };
    
    public readonly setListener = (listener? : () => void) => {
        this.listener = listener
    }
}


class DatePeriodChooser extends bind.Composite {

    @bind.uiField
    private startDateField : JQuery;

    @bind.uiField
    private endDateField : JQuery;

    @bind.uiBind
    private startTimeField = new Select<number> ();

    @bind.uiBind
    private endTimeField = new Select<number> ();

    private period = DATE_PERIOD.ALL;
    private listener : ()=> void = ()=> {};

    public getPeriod(): DATE_PERIOD {
        return this.period;
    }
    
    public setPeriod(period : DATE_PERIOD) {
        this.period = period;
        
        if (this.period == DATE_PERIOD.TODAY) {
            this.setTodayDate()
        }
        else if (this.period == DATE_PERIOD.YESTERDAY) {
            this.setYesterdayDate()
        }
        else if (this.period == DATE_PERIOD.WEEK) {
            this.setWeekDate()
        }
        else if (this.period == DATE_PERIOD.MONTH) {
            this.setMonthDate()
        }
        else if (this.period == DATE_PERIOD.YEAR) {
            this.setYearDate()
        }
        else if (this.period == DATE_PERIOD.ALL) {
            this.setAllTimeDate()
        }
    }

    public getWaitElements(): JQuery[]{
        return [this.startDateField, this.endDateField, this.endTimeField.getElement(), this.startTimeField.getElement()];
    }

    public getStart () : Date {
        return this.getDate(this.startDateField, this.startTimeField);
    }

    public getEnd () : Date {
        return this.getDate(this.endDateField, this.endTimeField);
    }

    public getStartString () : string {
        var result: Date = this.getStart();

        if (result == null) {
            return null
        }
        else {
            return result.getTime() + "";
        }
    }

    public getEndString () : string {
        var result: Date = this.getEnd();

        if (result == null) {
            return null
        }
        else {
            return result.getTime() + "";
        }
    }

    public setStart (date : Date) {
        this.setDate(date, this.startDateField, this.startTimeField);
    }

    public setEnd (date : Date) {
        this.setDate(date, this.endDateField, this.endTimeField);
    }

    private getDate (input : JQuery, time : Select<number>) : Date {
        var result = new Date (0);

        var shift = result.getHours();

        var parts : string [] = input.val().split(".");

        if (result.setFullYear(parseInt(parts[2]),parseInt(parts[1]) - 1, parseInt(parts[0])) > 0) {

            if (time.getValue() != null) {
                result.setHours(time.getValue());
            }

            result.setHours(result.getHours());

            return result;
        }
        else {
            return null;
        }
    }

    private setDate (date : Date, input : JQuery, time : Select<number>) {
        if (date != null) {
            input.val(lib.formatDateddMMyyyy(date));
            time.setValue(date.getHours());
        }
        else {
            input.val(null);
            time.setValue(0);
        }
    }

    public onChange(listener : () => void) {
        this.listener = listener;
    };
    
    private setAllTimeDate = ()=> {
        this.startDateField.val("");
        this.endDateField.val("");
        this.startTimeField.setValue(0);
        this.endTimeField.setValue(0);
        this.period = DATE_PERIOD.ALL;
        this.listener ();
    }
    private setTodayDate = ()=> {
            
        let midnight = new Date()
        midnight.setHours(0)
        midnight.setMinutes(0)
        midnight.setSeconds(0)

        let delta = new Date().getTime() - midnight.getTime()

        this.startDateField.val(lib.formatDateddMMyyyy(new Date(new Date().getTime() - delta)));
        this.endDateField.val("");
        this.startTimeField.setValue(0);
        this.endTimeField.setValue(0);
        this.period = DATE_PERIOD.TODAY;
        this.listener ();
    }
    
    private setYesterdayDate = ()=> {
            
        let midnight = new Date()
        midnight.setHours(0)
        midnight.setMinutes(0)
        midnight.setSeconds(0)

        this.startDateField.val(lib.formatDateddMMyyyy(new Date(midnight.getTime())));
        this.endDateField.val(lib.formatDateddMMyyyy(new Date(midnight.getTime() - 24 * 60 * 60 * 1000)));
        this.startTimeField.setValue(0);
        this.endTimeField.setValue(0);
        this.period = DATE_PERIOD.YESTERDAY;
        this.listener ();
    }
    
    private setWeekDate = ()=> {

        this.startDateField.val(lib.formatDateddMMyyyy(new Date()));
        this.endDateField.val(lib.formatDateddMMyyyy(new Date (new Date().getTime() - 60 * 60 * 24 * 7 * 1000)));
        this.startTimeField.setValue(0);
        this.endTimeField.setValue(0);
        this.period = DATE_PERIOD.WEEK;
        this.listener ();
    }
    
    private setMonthDate = ()=> {
        this.startDateField.val(lib.formatDateddMMyyyy(new Date()));
        this.endDateField.val(lib.formatDateddMMyyyy(new Date (new Date().getTime() - 60 * 60 * 24 * 30 * 1000)));
        this.startTimeField.setValue(0);
        this.endTimeField.setValue(0);
        this.period = DATE_PERIOD.MONTH;
        this.listener ();
    }
    
    private readonly setYearDate = ()=> {
        this.startDateField.val(lib.formatDateddMMyyyy(new Date()));
        this.endDateField.val(lib.formatDateddMMyyyy(new Date (new Date().getTime() - 60 * 60 * 24 * 356 * 1000)));
        this.startTimeField.setValue(0);
        this.endTimeField.setValue(0);
        this.period = DATE_PERIOD.YEAR;
        this.listener ();
    }
    
    constructor () {
        super(datePeriodChooserTemplate);

        this.bind();

        var hourRenderer = (hour: number, li: JQuery) => {
            if (hour == null) {
                li.text ("");
            }
            else {
                li.text(lib.formatTimePart(hour) + ":00");
            }
        };

        var hourData = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];

        this.startTimeField.setRenderer(hourRenderer);
        this.endTimeField.setRenderer(hourRenderer);

        this.startTimeField.setData(hourData);
        this.endTimeField.setData(hourData);

        this.startTimeField.onChange(()=> {
            if (this.startTimeField.getValue() != 0) {
                this.period = null;
            }
            this.listener ();
        });

        this.endTimeField.onChange(()=> {
            if (this.endTimeField.getValue() != 0) {
                this.period = null;
            }
            this.listener ();
        });

        (<any>this.startDateField).datepicker({
            format: "dd.mm.yyyy",
            language: "ru",
            weekStart: 1,
            orientation: "top left",
            autoclose: true,
            todayHighlight: true,
            keyboardNavigation : false
        }).on('changeDate', ()=> {
            this.listener ();
        });

        (<any>this.endDateField).datepicker({
            format: "dd.mm.yyyy",
            language: "ru",
            weekStart: 1,
            orientation: "top left",
            autoclose: true,
            todayHighlight: true,
            keyboardNavigation : false
        }).on('changeDate', ()=> {
            this.listener ();
        })

        this.startDateField.click(()=> {
            this.period = null;
        })

        this.endDateField.click(()=> {
            this.period = null;
        })
    }
}
