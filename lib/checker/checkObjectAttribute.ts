/* 检查配置对象属性及类型 */


import {
    type Rule, // 类配置对象检查器的子属性的规则类型
    type OptionsRules, // 类配置对象检查器的规则类型
} from "../tsType/optionsRulesType";
import {
    type RealClassConfigType // 实际使用的类配置对象类型
} from "../tsType/classConfigType";
import { objKeys } from "../assistant/objKeys";
import { ValidateObject } from "../validate/ValidateObject";
import { checkType, isInvalid } from "../type/checkType";


/* ========== */


export type checkRelust = {
    isValid: boolean,
    errors: Array<string>,
    tips: Array<string>
}


/* ========== */


/**
 * 检查对象属性及属性值是否符合规则类型
 *
 * @function checkObjectAttribute
 * @param { RealClassConfigType<boolean> } classConfig 类配置对象
 * @param { { [key: string]: any } } obj 需要查验的对象
 * @param { OptionsRules } rules 规则
 * @returns { checkRelust } 验证结果对象
 */
export function checkObjectAttribute(
    classConfig: RealClassConfigType<boolean>,
    obj: { [key: string]: any },
    rules: OptionsRules
): checkRelust {
    let errors: Array<string> = [];
    let tips: Array<string> = [];

    /**
     * 添加错误信息
     * @function addError
     * @param { Rule } rule 规则对象
     * @param { string } message 错误信息
     */
    const addError = (rule: Rule, message: string): void => { rule.required ? errors.push(message) : tips.push(message) };


    /* ===== */

    // 验证对象有效性
    const _OBJ = ValidateObject(classConfig, obj); // 查验对象有效性

    // 获取所有属性名
    const objProps = objKeys(_OBJ);
    const ruleProps = objKeys(rules);

    // 检查额外属性
    for (const prop of objProps) {
        if (!ruleProps.includes(prop))
            tips.push(`Extra property found: "${prop}". This property is not defined in the validation rules.`);
    }

    // 遍历ruleProps数组
    for (const rulePropName of ruleProps) {
        const rule = rules[rulePropName]; // 获取rules对象中 rulePropName 对应的规则
        const propValue = _OBJ.hasOwnProperty(rulePropName) ? _OBJ[rulePropName] : void 0; // 获取_OBJ对象中 rulePropName 对应的值

        // 如果规则要求该属性必须存在，但_OBJ对象中该属性不存在，则添加错误信息
        if (rule.required && isInvalid(propValue)) {
            addError(rule, `Missing required property: "${rulePropName}"`);
            continue;
        }

        // 如果规则不要求该属性必须存在，且_OBJ对象中该属性不存在，则跳过
        if (!rule.required && isInvalid(propValue)) continue;

        // 如果规则要求该属性的类型，但_OBJ对象中该属性的值类型不匹配，则添加错误信息
        if (rule.type &&
            checkType(propValue) !== rule.type
        ) addError(rule, `Property "${rulePropName}" must be of type "${rule.type}", but was "${typeof propValue}"`);

        // 如果规则要求该属性必须通过验证器验证，但_OBJ对象中该属性的值未通过验证器验证，则添加错误信息
        if (rule.validator &&
            propValue !== void 0 &&
            !rule.validator(propValue)
        ) addError(rule, rule.errorMessage || `Property "${rulePropName}" failed validation.`);
    }

    // 返回包含验证结果的对象
    return { isValid: errors.length === 0, errors, tips };
};