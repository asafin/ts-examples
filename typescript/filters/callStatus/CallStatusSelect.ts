import {Select} from "../../../../component/Select";
import enums = require("../../../../../swagger/enums");


export class CallStatusSelect extends Select<enums.CALL_STATUS> {
    constructor() {
        super();

        this.setRenderer((model: enums.CALL_STATUS, li: JQuery) => {
            if (model == null) {
                li.text("Все");
            }
            else if (model == enums.CALL_STATUS.MISSED) {
                li.text("Пропущен");
            }
            else if (model == enums.CALL_STATUS.PLACED) {
                li.text("Сделан");
            }
            else if (model == enums.CALL_STATUS.REDIRECTED) {
                li.text("Переадресован");
            }
            else if (model == enums.CALL_STATUS.RECIEVED) {
                li.text("Принят");
            }
        });

        this.setData([null, enums.CALL_STATUS.MISSED, enums.CALL_STATUS.PLACED, enums.CALL_STATUS.RECIEVED]);
    }
}
