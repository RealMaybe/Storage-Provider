/* 检查格式化后的类配置对象属性及属性值是否符合规则类型 */


import { type ClassConfigOptionsRules } from "../../scriptType/optionsRulesType"; // 类配置对象检查器的规则类型
import {
    type ClassOptionsType, // 格式化后的类配置对象类型
    type RealClassConfigType,// 实际使用的配置对象类型
} from "../../scriptType/classConfigType";
import {
    type checkRelust, // 验证结果对象
    checkObjectAttribute // 检查对象属性及属性值是否符合规则类型
} from "../checker/checkObjectAttribute";


/* ========== */


/**
 * 检查格式化后的类配置对象属性及属性值是否符合规则类型
 *
 * @function configChecker
 * @param { RealClassConfigType<boolean> | ClassOptionsType} classConfig 类配置对象
 * @param { { [key: string]: any } } obj 需要查验的对象
 * @param { OptionsRules } rules 规则
 * @returns { checkRelust } 验证结果对象
 */
export const configChecker = (
    classConfig: RealClassConfigType<boolean> | ClassOptionsType,
    obj: ClassOptionsType,
    rules: ClassConfigOptionsRules
): checkRelust => checkObjectAttribute(classConfig as RealClassConfigType<boolean>, obj, rules);
