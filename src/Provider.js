// 导入依赖
import { StorageProvider } from "./Storage.js";

/** 
 * @class Provider
 */
export class Provider extends StorageProvider {
    constructor(settings) {
        super(settings);
    }

    /**
     * 
     * @param { string } key 
     * @param { (value: any) => void } callback 
     */
    getItem(key, callback) {
        if (typeof callback === "function")
            callback(this.get(key));
        else throw new Error("callback must be a function");

        return this
    }

    /**
     * 
     * @param { Array<string> } keys 
     * @param { (values: { [key: string]: any }) => void } callback 
     * @returns 
     */
    getManyItem(keys, callback) {
        if (typeof callback === "function")
            callback(this.getMany(keys, "object"));
        else throw new Error("callback must be a function");

        return this
    }

    /**
     * 
     * @param { (values: { [key: string]: any }) => void } callback 
     * @returns 
     */
    getAllItem(callback) {
        if (typeof callback === "function")
            callback(this.getAll());
        else throw new Error("callback must be a function");

        return this
    }
}