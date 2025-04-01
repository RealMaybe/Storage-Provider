import { isString, isObjectAndNotArray } from "../../type/checkType";
import { type UserOptionsType } from "../../scriptType/classConfigType";
import { StorageProvider } from "../../scriptType/provider";
import { type OutputType, type OutputResult, } from "../../scriptType/methodType";
import { type ObsoleteStorageResult } from "../../scriptType/pluginType";


/* ========== */


/**
 * StorageProvider Plugin
 * @function ObsoleteStorage
 * @param { StorageProvider } $SP StorageProvider
 * @returns { ObsoleteStorageResult } Return a new class.
 */
export function ObsoleteStorage($SP: typeof StorageProvider): ObsoleteStorageResult;

/**
 * StorageProvider Plugin
 * @function ObsoleteStorage
 * @param { StorageProvider } $SP StorageProvider
 * @param { UserOptionsType } settings Configuration object of the StorageProvider class, If the content is passed in, this function will directly return an example of the newly configured class.
 * @returns { ObsoleteStorageResult } Return a new class instance object.
 */
export function ObsoleteStorage($SP: typeof StorageProvider, settings: UserOptionsType): ObsoleteStorageResult;


/* ========== */


// 实际实现逻辑
export function ObsoleteStorage(
    $SP: typeof StorageProvider,
    settings?: UserOptionsType
): ObsoleteStorageResult {
    if (!$SP || !("prototype" in $SP))
        throw new Error("First argument must be the StorageProvider class.");

    /**
     * @type { ObsoleteStorageResult }
     * @class
     * @extends $SP
     */
    class ob extends $SP {
        constructor(options: UserOptionsType) { super(options) };

        Storage(key: string, value?: any): void | any { return this.storage(key, value) };

        Save(key: string, value: any): void { this.save(key, value) };

        SaveMany(values: Array<{ key: string, value: any }>): void { this.saveMany(values) };

        SetMany(values: { [key: string]: any }): void { this.setMany(values) };

        Set(...content:
            Array<{ key: string, value: any }>
            | [{ [key: string]: any }]
            | [string, any]
        ): void { this.set(...content) };

        Get(key: string): void { return this.get(key) };

        GetMany<K extends string>(
            values: Array<K>,
            type: OutputType = "object"
        ): OutputResult<K, typeof type> { return this.getMany(values, type) };

        GetAll(): { [storageKey: string]: any } { return this.getAll() };

        Delete(key: null | string = null): void { this.delete(key) };

        Remove(key: string): void { this.remove(key) };

        RemoveMany(keys: Array<string>): void { this.removeMany(keys) };

        Clean(): void { this.clean() };
    };

    // Check if settings are valid
    const isSettingsValid: boolean = (
        isString(settings) &&
        ["local", "session"].includes(settings)
    ) || isObjectAndNotArray(settings);

    return settings && isSettingsValid ? new ob(settings) : ob;
}