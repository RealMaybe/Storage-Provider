/* 默认配置 */


import { type ClassConfigOptionsRules } from "../../scriptType/optionsRulesType"
import { objKeys } from "../../assistant/objKeys";
import { configRuleType } from "./configRuleType";


/* ========== */


/**
 * - storageType: any
 * - warn: any
 * - circular: any
 * - original: any
 * - monitor: any
 * - channelName: any
 * - prefix: any
 * - maxSize: any
 * - plugin: any
 * - ignore: any
 */
export const configDefault: {
    [K in keyof ClassConfigOptionsRules]: ClassConfigOptionsRules[K]["defaultValue"]
} = objKeys(configRuleType)
    .reduce((defaults, key) => {
        // 确保 key 是 keyof ClassConfigOptionsRules 类型
        if (objKeys(configRuleType).includes(key)) {
            defaults[key as keyof ClassConfigOptionsRules] = configRuleType[key as keyof ClassConfigOptionsRules].defaultValue;
        }
        return defaults;
    }, {} as {
        [K in keyof ClassConfigOptionsRules]: ClassConfigOptionsRules[K]["defaultValue"]
    });