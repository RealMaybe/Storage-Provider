import { type CircularItem } from "./circularType"; // 循环引用类型
import {
    type $inspector,
    type OutputType,
    type OutputResult,
} from "./methodType";
import {
    type RealClassConfigType, // 真实的类配置类型
    type UserOptionsType // 用户传入的配置类型
} from "./classConfigType";


/* ========== */


export interface StorageProvider {
    circular<T extends CircularItem>(item: T): T;
    inspector(obj: {
        [storageKey: string]: string | ((item: any) => boolean)
    }): $inspector;
    sendMsg(data: any): void;
    postMsg(data: any): void;
    listenMsg(callback: (message: any) => void): (close?: boolean) => void;
    storage(key: string, value?: any): void | any;
    rewrite(
        keys: string | Array<string>,
        callback: (items: {
            [storageKey: string]: any
        }) => ({
            [storageKey: string]: any
        })
    ): void;
    save(key: string, value: any): void;
    saveMany(values: Array<{ key: string, value: any }>): void;
    setMany(values: { [key: string]: any }): void;
    set(...data: Array<{ key: string, value: any }> | [{ [key: string]: any }] | [string, any]): void;
    get(key: string): void | any;
    getMany<K extends string>(arr: Array<K>, type: OutputType): OutputResult<K, typeof type>
    getAll(): { [storageKey: string]: any };
    delete(key: null | string): void;
    remove(key: string): void;
    removeMany(keys: Array<string>): void;
    clean(): void;
};

/**
 * @class
*/
export class StorageProvider {
    #config: RealClassConfigType<boolean>;
    constructor(options: UserOptionsType);
    circular<T extends CircularItem>(item: T): T;
    inspector(obj: {
        [storageKey: string]: string | ((item: any) => boolean)
    }): $inspector;
    sendMsg(data: any): void;
    postMsg(data: any): void;
    listenMsg(callback: (message: any) => void): (close?: boolean) => void;
    storage(
        key: string,
        value?: any
    ): void | any;
    rewrite(
        keys: string | Array<string>,
        callback: (items: {
            [storageKey: string]: any
        }) => ({
            [storageKey: string]: any
        })
    ): void;
    save(key: string, value: any): void;
    saveMany(values: Array<{ key: string, value: any }>): void;
    setMany(values: { [key: string]: any }): void;
    set(...data: Array<{ key: string, value: any }> | [{ [key: string]: any }] | [string, any]): void;
    get(key: string): void | any;
    getMany<K extends string>(
        arr: Array<K>,
        type: OutputType
    ): OutputResult<K, typeof type>
    getAll(): { [storageKey: string]: any };
    delete(key: null | string): void;
    remove(key: string): void;
    removeMany(keys: Array<string>): void;
    clean(): void;
};


/* ========== */


export interface ob {
    Storage(key: string, value?: any): void | any;
    Save(key: string, value: any): void;
    SaveMany(values: Array<{ key: string, value: any }>): void;
    SetMany(values: { [key: string]: any }): void;
    Set(...data: Array<{ key: string, value: any }> | [{ [key: string]: any }] | [string, any]): void;
    Get(key: string): void | any;
    GetMany<K extends string>(arr: Array<K>, type: OutputType): OutputResult<K, typeof type>
    GetAll(): { [storageKey: string]: any };
    Delete(key: null | string): void;
    Remove(key: string): void;
    RemoveMany(keys: Array<string>): void;
    Clean(): void;
};

/**
 * @class
*/
export class ob {
    constructor(options: UserOptionsType);
    Storage(
        key: string,
        value?: any
    ): void | any;
    Save(key: string, value: any): void;
    SaveMany(values: Array<{ key: string, value: any }>): void;
    SetMany(values: { [key: string]: any }): void;
    Set(...data: Array<{ key: string, value: any }> | [{ [key: string]: any }] | [string, any]): void;
    Get(key: string): void | any;
    GetMany<K extends string>(
        arr: Array<K>,
        type: OutputType
    ): OutputResult<K, typeof type>
    GetAll(): { [storageKey: string]: any };
    Delete(key: null | string): void;
    Remove(key: string): void;
    RemoveMany(keys: Array<string>): void;
    Clean(): void;
}


/* ========== */


export interface esr {

}

export class esr {
    constructor(options: UserOptionsType);
}