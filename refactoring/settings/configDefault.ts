/* 默认配置 */


import { type ClassConfigOptionsRules } from "../tsType/optionsRulesType"
import { type ClassOptionsType } from "../tsType/classConfigType";
import { objKeys } from "../assistant/objKeys";
import { configRuleType } from "./configRuleType";


// 生成 configDefault 对象并添加类型注解
export const configDefault: {
    [K in keyof ClassConfigOptionsRules]: ClassConfigOptionsRules[K]["defaultValue"]
} = objKeys(configRuleType)
    .reduce((defaults, key) => {
        defaults[key] = configRuleType[key].defaultValue;
        return defaults;
    }, {} as {
        [K in keyof ClassConfigOptionsRules]: ClassConfigOptionsRules[K]["defaultValue"]
    });



