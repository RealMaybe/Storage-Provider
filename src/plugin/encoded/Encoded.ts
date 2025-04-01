// import { isString, isObjectAndNotArray } from "../type/checkType";
// import { type UserOptionsType } from "../scriptType/classConfigType";
// import { type OutputType, type OutputResult, } from "../scriptType/methodType";
import { StorageProvider } from "../../scriptType/provider";
import { type EncodedStorageResult } from "../../scriptType/pluginType";


/* ========== */


/**
 * StorageProvider Plugin
 * @function EncodedStorage
 * @param { StorageProvider } $SP StorageProvider
 * @returns { EncodedStorageResult } Return a new class.
 */
export function EncodedStorage($SP: typeof StorageProvider): EncodedStorageResult;


/* ========== */


// 实际实现逻辑
export function EncodedStorage(
    $SP: typeof StorageProvider
): EncodedStorageResult {
    class EncodedStorage extends $SP {
        constructor(options: any) {
            super(options);
        }

        encode(data: any): any {
            return {
                encode: true,
                value: data,
            }
        }

        encoded(data: any) {
            return this.encode(data);
        }
    };

    return EncodedStorage
};
