import { ClassEvent } from "../utils/ClassEvent";

export class Model extends ClassEvent{

    constructor(){

        super();

        this._data = {};
    }

    fromJSON(json){

        this._data = Object.assign(this._data, json);
        console.log(json);
        this.trigger('datachange', this.toJSON());

    }

    toJSON(){

        return this._data;

    }

}