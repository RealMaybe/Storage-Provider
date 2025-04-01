import {
    StorageProvider,
    ob,
    esr,
} from "./provider";


/* ========== */


/**
 * @description The result of the plugin
 */
export type ObsoleteStorageResult = ob | typeof ob | StorageProvider | typeof StorageProvider;

export type EncodedStorageResult = esr | typeof esr | StorageProvider | typeof StorageProvider;