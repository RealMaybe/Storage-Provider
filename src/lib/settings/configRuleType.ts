/* 参数属性类型 */


import { type ClassConfigOptionsRules } from "../../scriptType/optionsRulesType";
import { isBoolean, isArray, isFunction, isString } from "../../typeChecker";
import { validatorFactory } from "./factoryFunction/validatorFactory";


/* ========== */


/**
 * @description 忽略的键
 * @type { Array<string> }
 */
export const IGNORE_ITEMS: Array<string> = ["null", "undefined", "NaN", "Infinity", "-Infinity"];


/* ========== */


/**
 * @description 新增规则类型
 * @type { ClassConfigOptionsRules }
 */
export const configRuleType: ClassConfigOptionsRules = {
    storageType: { // 存储类型
        type: "string",
        required: true,
        validator: (value: any): boolean => ["local", "session"].includes(value),
        errorMessage: "'storageType' property value is invalid. It must be 'local' or 'session'.",
        defaultValue: "local"
    },
    warn: { // 是否打印警告
        type: "boolean",
        required: true,
        validator: isBoolean,
        errorMessage: "'warn' property value is invalid. It must be true or false.",
        defaultValue: true
    },
    circular: { // 是否自动去除循环引用
        type: "boolean",
        required: false,
        validator: isBoolean,
        errorMessage: "'circular' property value is invalid. It must be true or false.",
        defaultValue: false
    },
    original: { // 是否直接使用原始值
        type: "boolean",
        required: false,
        validator: isBoolean,
        errorMessage: "'original' property value is invalid. It must be true or false.",
        defaultValue: false
    },
    monitor: { // 是否开启监听器
        type: "boolean",
        required: false,
        validator: isBoolean,
        errorMessage: "'monitor' property value is invalid. It must be true or false.",
        defaultValue: false
    },
    channelName: { // 通道名称
        type: "string",
        required: false,
        validator: validatorFactory("string", {
            min: 1,
            max: 30
        }),
        errorMessage: "'channelName' property value is invalid. It must be a string with length between 1 and 30.",
        defaultValue: "StorageProvider_Channel"
    },
    maxSize: { // 最大存储大小
        type: "number",
        required: false,
        validator: validatorFactory("number", {
            min: 1,
            max: 5242880
        }),
        errorMessage: "'maxSize' property value is invalid. It must be a positive integer less than or equal to 5242880.",
        defaultValue: 1048576
    },
    prefix: { // 前缀
        type: "string",
        required: false,
        validator: validatorFactory("string", {
            min: 1,
            max: 10
        }),
        errorMessage: "'prefix' property value is invalid. It must be a string with length between 1 and 10.",
        defaultValue: "myApp_"
    },
    plugin: { // 插件
        type: ["array", "array-function"],
        required: false,
        validator: (item: any): boolean => isArray(item) && item.every(item => isFunction(item)),
        errorMessage: "The 'plugin' attribute value is invalid. It must be an array. And all elements in the array must be functions",
        defaultValue: {}
    },
    ignore: { // 忽略的键
        type: ["string", "array-string"],
        required: false,
        validator: (item: any): boolean => {
            if (isString(item))
                return !IGNORE_ITEMS.includes(item);
            else if (isArray(item))
                return item.every(subItem => isString(subItem) && !IGNORE_ITEMS.includes(subItem));
            else return false;
        },
        errorMessage: "'ignore' property value is invalid. It must be a string with length between 1 and 30.",
        defaultValue: []
    }
};