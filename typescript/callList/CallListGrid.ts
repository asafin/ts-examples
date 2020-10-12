/// <amd-dependency path="text!./CallListGrid.html" name="template"/>

declare var template: string;

import lib = require("../../../../lib/lib");
import bind = require("../../../../import/bind");
import component = require("../../../component/component");
import api = require("../../../../swagger/application.cabinet.shared.stat");
import helper = require("../../../helper");
import enums = require("../../../../swagger/enums");
import recordWidgetApi = require("../../../../swagger/application.cabinet.shared.storage.recordWidget");

import comment = require("./../../storage/CommentApi");
import commentPopover = require("./../../storage/CommentPopover");

export class CallListGrid extends bind.Composite {
    
    @bind.uiField private listContentWrapper : JQuery;

    constructor() {
        super(template);

        this.bind();
        
        this.getElement().addClass("Grid")
        
        this.refresh();
    }
    
    private readonly refresh = () => {
        this.renderList()
    }
    
    private readonly renderList = () => {
        statList.map(item => {
            this.listContentWrapper.append(this.renderRow(item))
        })
    }
    
    private readonly renderRow = (model: api.CallRecordModel) : JQuery => {
        let row : JQuery = $("<div></div>").addClass("content-row") 
        let rowMain : JQuery = $("<div></div>").addClass("content-row__main") 
        let wrapperAddition : JQuery = $("<div></div>").addClass("content-row__wrapperAddition") 
        
        rowMain
            .append(this.renderDateItem(model))
            .append(this.renderDirectionItem(model))
            .append(this.renderPhoneItem(model))
            .append(this.renderCompanyPhoneItem(model))
            .append(this.renderAbonentItem(model))
            .append(this.renderDepartmentItem(model))
            .append(this.renderDurationAndPlayBtnItem(model))
            .append(this.renderCommentItem(model))
        
        if (model.redirected.length > 0) {
            rowMain
                .append(this.renderCollapseBtnItem(model, row))
            
            model.redirected.map(redirectedItem => {
                let rowAddition : JQuery = $("<div></div>").addClass("content-row__addition") 
                
                rowAddition
                    .append(this.renderDateItem(redirectedItem))
                    .append(this.renderDirectionItem(redirectedItem))
                    .append(this.renderPhoneItem(redirectedItem))  
                    .append(this.renderCompanyPhoneItem(redirectedItem))  
                    .append(this.renderAbonentItem(redirectedItem))
                    .append(this.renderDepartmentItem(redirectedItem))
                    .append(this.renderDurationItem(model))
                    
                wrapperAddition.append(rowAddition)    
            })        
        }
        
        row.append(rowMain).append(wrapperAddition)
        
        return row;
    }
    
    private readonly renderDateItem = (model: api.CallRecordBaseModel) : JQuery => {
        let date = new Date(parseInt(model.date) + lib.TIMEZONE_OFFSET);
        let item : JQuery = $("<div></div>")
            .addClass("content-row__item content-row__item_date")
            .append(
                $('<div>').text(lib.formatDateToLiteral(date))
            )
            .append(
                $('<div>').text(lib.formatTimeHHmmss(date))
            );
            
        return item;    
    }
    
    private readonly renderDepartmentItem = (model: api.CallRecordBaseModel) : JQuery => {
        let dep = $("<div/>").text(model.department);

        if (model.isDeletedAbonent) {
            dep.addClass("deleted");
        }
        else {
            dep.removeClass("deleted");
        }
            
        let item : JQuery = $("<div></div>")
            .addClass("content-row__item content-row__item_department")
            .append(dep)
            
        return item;    
    }
    
    private readonly renderAbonentItem = (model: api.CallRecordBaseModel) : JQuery => {
        
        let abnFio = $("<div/>").text(model.abonentFio);
        let abnExt = $("<div/>").text(model.abonentExt);

        if (model.isDeletedAbonent) {
            abnFio.addClass("deleted");
        }
        else {
            abnFio.removeClass("deleted");
        }
        
        let item : JQuery = $("<div></div>")
            .addClass("content-row__item content-row__item_abonent")
            .append(abnFio)
            .append(abnExt);
            
        return item;    
    }
    
    private readonly renderDirectionItem = (model: api.CallRecordBaseModel) : JQuery => {
        
        let arrow: JQuery = $("<div></div>")
            .addClass('arrow')
            .addClass(this.getArrowWrapperClass(model))
        
        if (model.direction == enums.DIRECTION.INB) {
            arrow.append($('<i class="fas fa-long-arrow-alt-down"></i>'))
        }
        else {
            arrow.append($('<i class="fas fa-long-arrow-alt-up"></i>'))
        }
        
        let item : JQuery = $("<div></div>")
            .addClass("content-row__item content-row__item_direction")
            .append(arrow)
            
        return item;    
    }
    
    private readonly getArrowWrapperClass = (model: api.CallRecordBaseModel) => {
        let cls : string = '';
        
        if (model.status == enums.CALL_STATUS.MISSED) {
            cls = 'missed'
        }
        else if (model.status == enums.CALL_STATUS.PLACED) {
            cls = 'placed'
        }
        else if (model.status == enums.CALL_STATUS.RECIEVED) {
            cls = 'recieved'
        }
        else {
            cls = 'redirected'
        }
        return cls
    }
    
    private readonly renderPhoneItem = (model: api.CallRecordBaseModel) : JQuery => {
        let phone = $("<div/>")
                    .text(lib.formatPhone2(model.phone))
        
        let item : JQuery = $("<div></div>")
            .addClass("content-row__item content-row__item_phone")
            .append(phone)
            
        return item;    
    }
    
    private readonly renderCompanyPhoneItem = (model: api.CallRecordBaseModel) : JQuery => {
        let phone = $("<div/>")
            .text(lib.formatPhone2(model.companyPhone))
        
        let item : JQuery = $("<div></div>")
            .addClass("content-row__item content-row__item_phone")
            .append(phone)
            
        return item;    
    }
    
    private readonly renderDurationAndPlayBtnItem = (model: api.CallRecordModel) : JQuery => {
        let duration = $("<div/>").text(lib.formatDuration(model.duration));
        
        let buttonGroup = $("<div/>");

        let playButton = $("<a/>")
            .addClass("playBtn")
            .appendTo(buttonGroup)
            .click(() => {
                component.showPopover(playButton, enums.POSITION.BOTTOM, false,
                    this.createCommentSoundPopover(model.recordId, (empty: boolean) => {
                        this.refresh()
                    }));
            });

        let downloadButton = $("<a/>")
            .addClass("downloadBtn")
            .click(() => {
                lib.download(recordWidgetApi.getDownloadUrl(model.recordId));
            })
            .appendTo(buttonGroup)

        if (!helper.isStorageAccess()) {
            playButton.hide();
            downloadButton.hide();
        }
        
        let item : JQuery = $("<div></div>")
            .addClass("content-row__item content-row__item_duration")
            .append(duration)
            .append(buttonGroup)
            
        return item;    
    }
    
    private readonly renderDurationItem = (model: api.CallRecordModel) : JQuery => {
        let duration = $("<div/>").text(lib.formatDuration(model.duration));
        
        let item : JQuery = $("<div></div>")
            .addClass("content-row__item content-row__item_duration")
            .append(duration)
            
        return item;    
    }
    
    private readonly renderCommentItem = (model: api.CallRecordModel) : JQuery => {
        
        let button = $("<a>")
            .click(() => {
                component.showPopover(button, enums.POSITION.BOTTOM, false,
                    this.createCommentPopover(model.recordId, (empty : boolean) => {
                        this.refresh()
                }));
            });

        if (model.comment) {
            button.addClass("commentIcon");
        }
        else {
            button.addClass("commentEmptyIcon");
        }
        
        let item : JQuery = $("<div></div>")
            .addClass("content-row__item content-row__item_comment")
            .append(button)
            
        return item;    
    }
    
    private readonly renderCollapseBtnItem = (model: api.CallRecordModel, wrapper: JQuery) : JQuery => {
        
        let button = $("<div></div>").addClass("collapseBtn")
        
        button.click(()=> {
            wrapper.toggleClass("showAddition")
        })
        
        let item : JQuery = $("<div></div>")
            .addClass("content-row__item content-row__item_collapseBtn")
            .append(button)
            
        return item;    
    }
    
    private createCommentSoundPopover = (recordId: number, commentUpdatedListener: comment.CommentUpdatedListener): commentPopover.CommentPopover => {
        return new class extends commentPopover.CommentSoundPopover {
            constructor() {
                super(recordId, recordWidgetApi.getComment, recordWidgetApi.update, commentUpdatedListener, true)
            }

            createSoundUrl(recordId: number, format: string): string {
                return recordWidgetApi.getPlayUrl(recordId, format);
            };
        };
    }
    
    private createCommentPopover = (recordId: number, commentUpdatedListener: comment.CommentUpdatedListener): commentPopover.CommentPopover => {
        return new class extends commentPopover.CommentSoundPopover {
            constructor() {
                super(recordId, recordWidgetApi.getComment, recordWidgetApi.update, commentUpdatedListener, false)
            }

            createSoundUrl(recordId: number, format: string): string {
                return recordWidgetApi.getPlayUrl(recordId, format);
            };
        };
    }
}


const statList: api.CallRecordModel [] = [
    {   
        direction: enums.DIRECTION.INB,
        status: enums.CALL_STATUS.RECIEVED,
        abonentExt: 200,
        abonentFio: "Иванов Иван Иванов Иван Иванов Иван Иванов Иван Иванов Иван",
        department: null,
        duration: 890,
        isDeletedAbonent: false,
        comment: null,
        date: '1598707483000',
        phone: '123456789',
        companyPhone: '987654321',
        fileSize: 4051512,
        recordId: 1,
        redirected: [
            {
                abonentExt: 200,
                abonentFio: "Иванов Иван",
                date: '1598707483000',
                department: null,
                direction: enums.DIRECTION.INB,
                duration: 890,
                isDeletedAbonent: false,
                phone: null,
                recordId: 1,
                status: enums.CALL_STATUS.RECIEVED,
                companyPhone: '987654321',
                comment: null,
                fileSize: null
            },
            {
                abonentExt: null,
                abonentFio: "Петров Петров Петров Петров Петров",
                date: '1598534683000',
                department: null,
                direction: enums.DIRECTION.OUT,
                duration: 58200,
                isDeletedAbonent: false,
                phone: "1234567890",
                recordId: 2,
                status: enums.CALL_STATUS.RECIEVED,
                companyPhone: '321',
                comment: null,
                fileSize: null
            },
            {
                abonentExt: 202,
                abonentFio: "Кузнецов Кузнец",
                date: '1598361883000',
                department: "Отдел продаж",
                direction: enums.DIRECTION.INB,
                duration: 56700,
                isDeletedAbonent: false,
                phone: "123456789",
                recordId: 3,
                status: enums.CALL_STATUS.RECIEVED,
                companyPhone: '987654321',
                comment: null,
                fileSize: null
            }
        ]        
    },
    {
        direction: enums.DIRECTION.OUT,
        status: enums.CALL_STATUS.MISSED,
        abonentExt: 200,
        abonentFio: "Иванов Иван",
        department: "Отдел продаж",
        duration: 56700,
        isDeletedAbonent: false,
        comment: null,
        date: '1598707483000',
        phone: "123456789",
        companyPhone: '987654321',
        fileSize: 4051512,
        recordId: 2,
        redirected: []
    },
    {
        direction: enums.DIRECTION.OUT,
        status: enums.CALL_STATUS.RECIEVED,
        abonentExt: 200,
        abonentFio: "Иванов Иван",
        department: "Отдел продаж",
        duration: 56700,
        isDeletedAbonent: false,
        comment: null,
        date: '1598707483000',
        phone: "123456789",
        companyPhone: '987654321',
        fileSize: 4051512,
        recordId: 2,
        redirected: []
    },
    {   
        direction: enums.DIRECTION.INB,
        status: enums.CALL_STATUS.MISSED,
        abonentExt: 200,
        abonentFio: "Иванов Иван",
        department: null,
        duration: 890,
        isDeletedAbonent: false,
        comment: null,
        date: '1598707483000',
        phone: '123456789',
        companyPhone: '987654321',
        fileSize: 4051512,
        recordId: 1,
        redirected: [
            {
                abonentExt: 200,
                abonentFio: "Иванов Иван",
                date: '1598707483000',
                department: null,
                direction: enums.DIRECTION.INB,
                duration: 890,
                isDeletedAbonent: false,
                phone: null,
                recordId: 1,
                status: enums.CALL_STATUS.RECIEVED,
                companyPhone: '987654321',
                comment: null,
                fileSize: null
            },
            {
                abonentExt: null,
                abonentFio: "Петров Петров Петров Петров Петров",
                date: '1598534683000',
                department: null,
                direction: enums.DIRECTION.OUT,
                duration: 58200,
                isDeletedAbonent: false,
                phone: "1234567890",
                recordId: 2,
                status: enums.CALL_STATUS.RECIEVED,
                companyPhone: '987654321',
                comment: null,
                fileSize: null
            },
            {
                abonentExt: 202,
                abonentFio: "Кузнецов Кузнец",
                date: '1598361883000',
                department: "Отдел продаж",
                direction: enums.DIRECTION.INB,
                duration: 56700,
                isDeletedAbonent: false,
                phone: "123456789",
                recordId: 3,
                status: enums.CALL_STATUS.RECIEVED,
                companyPhone: '987654321',
                comment: null,
                fileSize: null
            }
        ]        
    },
    {
        direction: enums.DIRECTION.OUT,
        status: enums.CALL_STATUS.RECIEVED,
        abonentExt: 200,
        abonentFio: "Иванов Иван Иванов Иван Иванов Иван Иванов Иван Иванов Иван",
        department: "Отдел продаж",
        duration: 56700,
        isDeletedAbonent: false,
        comment: null,
        date: '1598707483000',
        phone: "123456789",
        companyPhone: '987654321',
        fileSize: 4051512,
        recordId: 2,
        redirected: []
    },
    {
        direction: enums.DIRECTION.OUT,
        status: enums.CALL_STATUS.RECIEVED,
        abonentExt: 200,
        abonentFio: "Иванов Иван",
        department: "Отдел продаж",
        duration: 56700,
        isDeletedAbonent: false,
        comment: null,
        date: '1598707483000',
        phone: "123456789",
        fileSize: 4051512,
        recordId: 2,
        redirected: [],
        companyPhone: '987654321'
    },
    {   
        direction: enums.DIRECTION.INB,
        status: enums.CALL_STATUS.RECIEVED,
        abonentExt: 200,
        abonentFio: "Иванов Иван",
        department: null,
        duration: 890,
        isDeletedAbonent: false,
        comment: null,
        date: '1598707483000',
        phone: null,
        fileSize: 4051512,
        recordId: 1,
        companyPhone: '987654321',
        redirected: [
            {
                abonentExt: 200,
                abonentFio: "Иванов Иван",
                date: '1598707483000',
                department: null,
                direction: enums.DIRECTION.INB,
                duration: 890,
                isDeletedAbonent: false,
                phone: null,
                recordId: 1,
                status: enums.CALL_STATUS.RECIEVED,
                companyPhone: '9871',
                comment: null,
                fileSize: null
            },
            {
                abonentExt: null,
                abonentFio: "Петров Петров Петров Петров Петров",
                date: '1598534683000',
                department: null,
                direction: enums.DIRECTION.OUT,
                duration: 58200,
                isDeletedAbonent: false,
                phone: "1234567890",
                recordId: 2,
                status: enums.CALL_STATUS.RECIEVED,
                companyPhone: '9871',
                comment: null,
                fileSize: null
            },
            {
                abonentExt: 202,
                abonentFio: "Кузнецов Кузнец",
                date: '1598361883000',
                department: "Отдел продаж",
                direction: enums.DIRECTION.INB,
                duration: 56700,
                isDeletedAbonent: false,
                phone: "123456789",
                recordId: 3,
                status: enums.CALL_STATUS.RECIEVED,
                companyPhone: '98765',
                comment: null,
                fileSize: null
            }
        ]        
    },
    {
        direction: enums.DIRECTION.OUT,
        status: enums.CALL_STATUS.RECIEVED,
        abonentExt: 200,
        abonentFio: "Иванов Иван Иванов Иван Иванов Иван Иванов Иван Иванов Иван",
        department: "Отдел продаж",
        duration: 56700,
        isDeletedAbonent: false,
        comment: null,
        date: '1598707483000',
        phone: "123456789",
        companyPhone: '987654321',
        fileSize: 4051512,
        recordId: 2,
        redirected: []
    },
    {
        direction: enums.DIRECTION.OUT,
        status: enums.CALL_STATUS.RECIEVED,
        abonentExt: 200,
        abonentFio: "Иванов Иван",
        department: "Отдел продаж",
        duration: 56700,
        isDeletedAbonent: false,
        comment: null,
        date: '1598707483000',
        phone: "123456789",
        fileSize: 4051512,
        recordId: 2,
        redirected: [],
        companyPhone: '987654321'
    },
    {
        direction: enums.DIRECTION.OUT,
        status: enums.CALL_STATUS.RECIEVED,
        abonentExt: 200,
        abonentFio: "Иванов Иван Иванов Иван Иванов Иван Иванов Иван Иванов Иван",
        department: "Отдел продаж",
        duration: 56700,
        isDeletedAbonent: false,
        comment: null,
        date: '1598707483000',
        phone: "123456789",
        fileSize: 4051512,
        recordId: 2,
        redirected: [],
        companyPhone: '987654321'
    },
    {
        direction: enums.DIRECTION.OUT,
        status: enums.CALL_STATUS.MISSED,
        abonentExt: 200,
        abonentFio: "Иванов Иван",
        department: "Отдел продаж",
        duration: 56700,
        isDeletedAbonent: false,
        comment: null,
        date: '1598707483000',
        phone: "123456789",
        fileSize: 4051512,
        recordId: 2,
        redirected: [],
        companyPhone: '987654321'
    },
    {
        direction: enums.DIRECTION.OUT,
        status: enums.CALL_STATUS.RECIEVED,
        abonentExt: 200,
        abonentFio: "Иванов Иван Иванов Иван Иванов Иван Иванов Иван Иванов Иван",
        department: "Отдел продаж",
        duration: 56700,
        isDeletedAbonent: false,
        comment: null,
        date: '1598707483000',
        phone: "123456789",
        fileSize: 4051512,
        recordId: 2,
        redirected: [],
        companyPhone: '987654321'
    },
    {
        direction: enums.DIRECTION.OUT,
        status: enums.CALL_STATUS.RECIEVED,
        abonentExt: 200,
        abonentFio: "Иванов Иван",
        department: "Отдел продаж",
        duration: 56700,
        isDeletedAbonent: false,
        comment: null,
        date: '1598707483000',
        phone: "123456789",
        fileSize: 4051512,
        recordId: 2,
        redirected: [],
        companyPhone: '987654321'
    },
    {
        direction: enums.DIRECTION.OUT,
        status: enums.CALL_STATUS.RECIEVED,
        abonentExt: 200,
        abonentFio: "Иванов Иван Иванов Иван Иванов Иван Иванов Иван Иванов Иван",
        department: "Отдел продаж",
        duration: 56700,
        isDeletedAbonent: false,
        comment: null,
        date: '1598707483000',
        phone: "123456789",
        fileSize: 4051512,
        recordId: 2,
        redirected: [],
        companyPhone: '987654321'
    },
    {
        direction: enums.DIRECTION.OUT,
        status: enums.CALL_STATUS.RECIEVED,
        abonentExt: 200,
        abonentFio: "Иванов Иван",
        department: "Отдел продаж",
        duration: 56700,
        isDeletedAbonent: false,
        comment: null,
        date: '1598707483000',
        phone: "123456789",
        fileSize: 4051512,
        recordId: 2,
        redirected: [],
        companyPhone: '987654321'
    }
]