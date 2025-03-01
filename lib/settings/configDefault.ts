/* 默认配置 */


import { type ClassConfigOptionsRules } from "../tsType/optionsRulesType"
// import { type ClassOptionsType } from "../tsType/classConfigType";
import { objKeys } from "../assistant/objKeys";
import { configRuleType } from "./configRuleType";


// 生成 configDefault 对象并添加类型
export const configDefault: {
    [K in keyof ClassConfigOptionsRules]: ClassConfigOptionsRules[K]["defaultValue"]
} = objKeys(configRuleType)
    .reduce((defaults, key) => {
        // 确保 key 是 keyof ClassConfigOptionsRules 类型
        if (Object.keys(configRuleType).includes(key)) {
            defaults[key as keyof ClassConfigOptionsRules] = configRuleType[key as keyof ClassConfigOptionsRules].defaultValue;
        }
        return defaults;
    }, {} as {
        [K in keyof ClassConfigOptionsRules]: ClassConfigOptionsRules[K]["defaultValue"]
    });


