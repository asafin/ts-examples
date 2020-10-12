import enums = require("./../../../../../swagger/enums");
import {RecordSelectableGrid} from "../../../../component/Grid";
import mod = require("./../../../../../swagger/mod");
import lib = require("./../../../../../lib/lib");
import {SORT} from "./../../../../../swagger/application.cabinet.app.client.page.numbers.editWidget";

export class AbonentChooserGrid extends RecordSelectableGrid<mod.AbonentModel, SORT> {

    private static COLUMN_NAME = "Имя";
    private static COLUMN_EXT = "Внутренний";
    private static COLUMN_PHONE = "Номер / ID";

    private fioFilterInput = $("<input/>", {class: 'Small', type: 'text', required: 'required'}).keyup((event) => {
        this.refresh();
    });

    private initialData: mod.AbonentModel [] = [];
    
    private sortField = SORT.NAME;
    private sortDirection = enums.SORT_DIRECTION.ASC;

    constructor() {
        super();

        this.onSort((sort: SORT, direction: enums.SORT_DIRECTION) => {
            this.sortField = sort;
            this.sortDirection = direction;

            this.refresh();
        });
        
        this.addSortColumn(AbonentChooserGrid.COLUMN_NAME, SORT.NAME,
            (model: mod.AbonentModel, td: JQuery) => {
                td.addClass('content-row__item_name').text(model.label);
            },
            (td: JQuery) => {
                td.append(this.fioFilterInput);
            }, 'name'
        );
        
        this.addSortColumn(AbonentChooserGrid.COLUMN_EXT, SORT.EXT,
            (model: mod.AbonentModel, td: JQuery) => {
                td.addClass('content-row__item_ext').text(model.ext);
            },
            null, 'ext'
        );
        
        this.addSortColumn(AbonentChooserGrid.COLUMN_PHONE, SORT.NUMBER,
            (model: mod.AbonentModel, td: JQuery) => {
                td.addClass('content-row__item_phone').text(model.phone == null ? model.userId : lib.formatRusPhone(model.phone));
            },
            null, 'phone'
        );
    }
    
    public setData(initialData: mod.AbonentModel []) {
        this.initialData = initialData;

        this.refresh();
    }

    private refresh() {

        var sortIndex = 1;

        if (this.sortDirection == enums.SORT_DIRECTION.ASC) {
            sortIndex = -1;
        }

        this.initialData.sort((a: mod.AbonentModel, b: mod.AbonentModel) => {
            return this.sort(a, b) * sortIndex;
        });

        super.setData(this.initialData.filter((model: mod.AbonentModel, index: number, array: mod.AbonentModel[]) => {

            if (this.fioFilterInput.val() != null) {
                if (model.label.toLowerCase().indexOf(this.fioFilterInput.val()) == -1) {
                    return false;
                }
                return true;
            }

            return true;
        }));
    }

    private sort(a: mod.AbonentModel, b: mod.AbonentModel) {
        if (this.sortField == SORT.NAME) {
            if (a.label) {
                if (this.sortDirection == enums.SORT_DIRECTION.ASC) {
                    return 1;
                }
                else {
                    return -1;
                }
            }
            else if (b.label) {
                if (this.sortDirection == enums.SORT_DIRECTION.ASC) {
                    return -1;
                }
                else {
                    return 1;
                }
            }
            else {
                return (a.label < b.label) ? 1 : -1;
            }
        }
        else if (this.sortField == SORT.EXT) {
            if (a.ext) {
                if (this.sortDirection == enums.SORT_DIRECTION.ASC) {
                    return 1;
                }
                else {
                    return -1;
                }
            }
            else if (b.ext) {
                if (this.sortDirection == enums.SORT_DIRECTION.ASC) {
                    return -1;
                }
                else {
                    return 1;
                }
            }
            else {
                return (a.ext < b.ext) ? 1 : -1;
            }
        }     
        else if (this.sortField == SORT.NUMBER) {
            if (a.phone) {
                if (this.sortDirection == enums.SORT_DIRECTION.ASC) {
                    return 1;
                }
                else {
                    return -1;
                }
            }
            else if (b.phone) {
                if (this.sortDirection == enums.SORT_DIRECTION.ASC) {
                    return -1;
                }
                else {
                    return 1;
                }
            }
            else {
                return (a.phone < b.phone) ? 1 : -1;
            }
        }   
        else {
            return 0;
        }
    }

}
