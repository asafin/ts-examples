import {Profile} from "./Profile"

export class Store {
    private static readonly PROFILE = "PROFILE"

    public readonly clear = () => localStorage.clear()

    public readonly profile = new StoreItem<Profile>(Store.PROFILE)
}

class StoreItem<T> {

    constructor (private readonly field : string) {

    }

    public readonly get = () => this.parseJsonValue<T>(localStorage.getItem(this.field))

    public readonly delete = () => localStorage.removeItem(this.field)

    public readonly set = (model: T) => {

        localStorage.setItem(this.field, JSON.stringify(model))

        return model;
    }

    private readonly parseJsonValue = <T> (value : string) => {

        if (value == null) {
            return null;
        }
        else {
            return JSON.parse(value) as T
        }
    }
}
