/// <amd-dependency path="text!./RatingListWidget.html" name="template"/>

declare var template: string;

import lib = require("../../../../lib/lib");
import bind = require("../../../../import/bind");
import callback = require("../../../../lib/callback");
import component = require("../../../component/component");

import helper = require("../../../helper");
import api = require("../../../../swagger/application.cabinet.shared.stat");

import {Grid} from "../../../component/Grid";
import {Paginator} from "../../../component/Paginator";

export class RatingListWidget extends bind.Composite {
    
    @bind.uiBind
    public paginator = new Paginator();
    
    @bind.uiBind private grid = new Grid<api.AbonentRatingModel, api.AbonentsRatingRequestSortField> ();
    
    @bind.uiBind private exportButton = new component.Button();

    constructor() {
        super(template);

        this.bind();
        
        this.setColumns();
        
        this.exportButton.click(() => this.getFile())
        
        this.refresh(helper.getRecordIdClient());
    }
    
    private readonly getFile = async () => {
        const file = await new Promise<string>((resolve, reject) => {
            api.abonentRatingListExportToXls(this.createAbonentsRatingExportRequestModel(), new callback.ErrorCallback((file: string) => {
                if (file) {
                    resolve(file)
                }
            }));
        })

        helper.download(file, "Stat", "xls"); 
    }
    
    private readonly createAbonentsRatingExportRequestModel = () : api.AbonentsRatingExportRequestModel => {
        let request = new api.AbonentsRatingExportRequestModel() 
        
        return request
    }
    
    private readonly setColumns = () => {
        this.grid.addSortColumn("Сотрудник", api.AbonentsRatingRequestSortField.ABONENT,
            (model: api.AbonentRatingModel, td: JQuery) => {
                let abnFio = $("<div/>");
                let abnExt = $("<div/>");

                if (model.abonentFio != null) {
                    abnFio.text(model.abonentFio);
                }

                if (model.abonentExt != null) {
                    abnExt.text(model.abonentExt);
                }

                td.addClass('content-row__item_abonent').append(abnFio).append(abnExt);
            }, null, 'abonent'
        );
        
        this.grid.addSortColumn("Принято", api.AbonentsRatingRequestSortField.INB_CALLS,
            (model: api.AbonentRatingModel, td: JQuery) => {
                let item = $("<div/>").text(model.inbCalls);               

                td.addClass('content-row__item_inbound').append(item);
            }, null, 'inbound'
        );
        
        this.grid.addSortColumn("Совершено", api.AbonentsRatingRequestSortField.OUT_CALLS,
            (model: api.AbonentRatingModel, td: JQuery) => {
                let item = $("<div/>").text(model.outCalls);               

                td.addClass('content-row__item_outbound').append(item);
            }, null, 'outbound'
        );
        
        this.grid.addSortColumn("Пропущено", api.AbonentsRatingRequestSortField.MISSING_CALLS,
            (model: api.AbonentRatingModel, td: JQuery) => {
                let item = $("<div/>").text(model.missingCalls);               

                td.addClass('content-row__item_missing').append(item);
            }, null, 'missing'
        );
        
        this.grid.addSortColumn("Длительность", api.AbonentsRatingRequestSortField.DURATION,
            (model: api.AbonentRatingModel, td: JQuery) => {
                let item = $("<div/>").text(lib.formatDuration(model.duration));               

                td.addClass('content-row__item_duration').append(item);
            }, null, 'duration'
        );
        
        this.grid.addSortColumn("Средняя длит.", api.AbonentsRatingRequestSortField.AVERAGE_DURATION,
            (model: api.AbonentRatingModel, td: JQuery) => {
                let item = $("<div/>").text(lib.formatDuration(model.averageDuration));               

                td.addClass('content-row__item_average_duration').append(item);
            }, null, 'average_duration'
        );
    }
    
    private readonly refresh =  (recordIdClient : number) => {
        this.grid.setData(ratingList);
    }
}

const ratingList : api.AbonentRatingModel [] = [
    {
        abonentExt: 200,
        abonentFio: "Иванов Иван Иванов Иван Иванов Иван Иванов Иван Иванов Иван",
        duration: 8900000,
        averageDuration: 120000,
        recordId: 1,
        outCalls: 43,
        inbCalls: 39,
        missingCalls: 15
    },
    {
        abonentExt: 201,
        abonentFio: "Петров Петр",
        duration: 5600000,
        averageDuration: 240000,
        recordId: 2,
        outCalls: 51,
        inbCalls: 59,
        missingCalls: 12
    },
    {
        abonentExt: 202,
        abonentFio: "Сидоров Сидор",
        duration: 4560000,
        averageDuration: 360000,
        recordId: 3,
        outCalls: 43,
        inbCalls: 39,
        missingCalls: 15
    },
    {
        abonentExt: 203,
        abonentFio: "Просто Фамилия",
        duration: 4560000,
        averageDuration: 120000,
        recordId: 4,
        outCalls: 43,
        inbCalls: 20,
        missingCalls: 15
    },
    {
        abonentExt: 204,
        abonentFio: "Петров Петр",
        duration: 7800000,
        averageDuration: 240000,
        recordId: 5,
        outCalls: 43,
        inbCalls: 39,
        missingCalls: 15
    },
    {
        abonentExt: 205,
        abonentFio: "Сидоров Сидор",
        duration: 4560000,
        averageDuration: 360000,
        recordId: 6,
        outCalls: 43,
        inbCalls: 39,
        missingCalls: 15
    },{
        abonentExt: 207,
        abonentFio: "Просто Фамилия",
        duration: 4560000,
        averageDuration: 120000,
        recordId: 7,
        outCalls: 43,
        inbCalls: 39,
        missingCalls: 15
    },
    {
        abonentExt: 208,
        abonentFio: "Иванов Иван Иванов Иван Иванов Иван Иванов Иван",
        duration: 4560000,
        averageDuration: 240000,
        recordId: 8,
        outCalls: 43,
        inbCalls: 39,
        missingCalls: 15
    },
    {
        abonentExt: 209,
        abonentFio: "Сидоров Сидор",
        duration: 4560000,
        averageDuration: 360000,
        recordId: 9,
        outCalls: 43,
        inbCalls: 39,
        missingCalls: 15
    },{
        abonentExt: 210,
        abonentFio: "Просто Фамилия",
        duration: 4560000,
        averageDuration: 120000,
        recordId: 10,
        outCalls: 43,
        inbCalls: 39,
        missingCalls: 15
    }
]
