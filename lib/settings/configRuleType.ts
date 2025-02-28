/* 参数属性类型 */


import {
    type ClassConfigOptionsRules
} from "../tsType/optionsRulesType"
import { booleanFactory } from "./factoryFunction/booleanFactory";
import { numberFactory } from "./factoryFunction/numberFactory";
import { stringFactory } from "./factoryFunction/stringFactory";
import { createConfigFactory } from "./factoryFunction/createConfigFactory";


/* ========== */


export const configRuleType: ClassConfigOptionsRules = {
    // 存储类型
    storageType: createConfigFactory(
        "string",
        true,
        {
            validator: value => ["local", "session"].includes(value),
            errorMessage: `"storageType" property value is invalid. It must be "local" or "session".`
        },
        "local"
    ),

    // 是否打印警告
    warn: createConfigFactory(
        "boolean",
        true,
        booleanFactory("warn"),
        true
    ),

    // 是否自动去除循环引用
    circular: createConfigFactory(
        "boolean",
        false,
        booleanFactory("circular"),
        false
    ),

    original: createConfigFactory(
        "boolean",
        false,
        booleanFactory("original"),
        false
    ),

    // 是否监控数据变化
    monitor: createConfigFactory(
        "boolean",
        false,
        booleanFactory("monitor"),
        false
    ),

    // 频道名称
    channelName: createConfigFactory(
        "string",
        false,
        stringFactory(1, 30, "channelName"),
        "StorageProvider_Channel"
    ),

    // 最大存储大小
    maxSize: createConfigFactory(
        "number",
        false,
        numberFactory(
            [">0", "<=5242880"],
            `The "maxSize" property value is invalid. It must be a positive integer less than or equal to 5242880.`
        ),
        1048576
    ),

    // 前缀
    prefix: createConfigFactory(
        "string",
        false,
        stringFactory(1, 10, "prefix"),
        "myApp_"
    ),

    /* // 是否加密
    encrypt: createConfig(
        "boolean",
        false,
        booleanValidator("encrypt"),
        false
    ),

    // 是否压缩
    compress: createConfig(
        "boolean",
        false,
        booleanValidator("compress"),
        false
    ),

    // 过期时间
    expirationTime: createConfig(
        "number",
        false, {
            validator: value => {
                if (typeof value !== "number" || value <= 0) return false;
                const currentTime = Date.now();
                const tenMinutesLater = currentTime + (60 * 1000 * 10);
                return value > tenMinutesLater;
            },
            errorMessage: `The "expirationTime" property value is invalid. It must be a timestamp representing a time at least ten minutes in the future.`
        },
        null
    ),

    // 存储时间
    storageTime: createConfig(
        "number",
        false, {
            validator: value => typeof value === "number" && value > 0,
            errorMessage: "Invalid time. It must be a positive number."
        },
        null
    ), */
}