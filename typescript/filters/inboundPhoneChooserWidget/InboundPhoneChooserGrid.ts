import enums = require("./../../../../../swagger/enums");
import {RecordSelectableGrid} from "../../../../component/Grid";
import mod = require("./../../../../../swagger/mod");

export class InboundPhoneChooserGrid extends RecordSelectableGrid<mod.InboundPhoneRouteModel, string> {

    private static COLUMN_NAME = "Маршрутизация";
    private static COLUMN_NUMBER = "Номер";

    private numberFilterInput = $("<input/>", {class: 'Small', type: 'text'}).keyup((event) => {
        this.refresh();
    });

    private initialData: mod.InboundPhoneRouteModel[] = [];
    
    private sortField = InboundPhoneChooserGrid.COLUMN_NUMBER;
    private sortDirection = enums.SORT_DIRECTION.ASC;

    constructor() {
        super();

        this.onSort((sort: string, direction: enums.SORT_DIRECTION) => {
            this.sortField = sort;
            this.sortDirection = direction;

            this.refresh();
        });
        
        this.addSortColumn(InboundPhoneChooserGrid.COLUMN_NUMBER, InboundPhoneChooserGrid.COLUMN_NUMBER,
            (model: mod.InboundPhoneRouteModel, td: JQuery) => {
                td.addClass('content-row__item_inbound-phone').text(model.phone);
            },
            (td: JQuery) => {
                td.append(this.numberFilterInput);
            }, 'inbound-phone'
        );
        
        this.addColumn(InboundPhoneChooserGrid.COLUMN_NAME, 
            (model: mod.InboundPhoneRouteModel, td: JQuery) => {
                td.addClass('content-row__item_name').text(model.name);
            }, null, 'name'
        )        
    }
    
    public setData(initialData: mod.InboundPhoneRouteModel[]) {
        this.initialData = initialData;

        this.refresh();
    }

    private refresh() {

        var sortIndex = 1;

        if (this.sortDirection == enums.SORT_DIRECTION.ASC) {
            sortIndex = -1;
        }

        this.initialData.sort((a: mod.InboundPhoneRouteModel, b: mod.InboundPhoneRouteModel) => {
            return this.sort(a, b) * sortIndex;
        });

        super.setData(this.initialData.filter((model: mod.InboundPhoneRouteModel, index: number, array: mod.InboundPhoneRouteModel[]) => {

            if (this.numberFilterInput.val() != null) {
                if (model.phone.toLowerCase().indexOf(this.numberFilterInput.val()) == -1) {
                    return false;
                }
            }

            return true;
        }));
    }

    private sort(a: mod.InboundPhoneRouteModel, b: mod.InboundPhoneRouteModel) {
        if (this.sortField == InboundPhoneChooserGrid.COLUMN_NUMBER) {
            if (a.main) {
                if (this.sortDirection == enums.SORT_DIRECTION.ASC) {
                    return 1;
                }
                else {
                    return -1;
                }
            }
            else if (b.main) {
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
