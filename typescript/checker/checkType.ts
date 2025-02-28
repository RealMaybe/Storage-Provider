/* 检查配置对象属性及类型 */

// 导入依赖
import {
    type TypeClassConfigDefaultValidator,
    type TypeClassConfig,
    type TypeClassConfigDefaultValueTypes
} from "../type/typeClassConfig"; // 导入类型
import { ValidateObject } from "../validate/ValidateObject"; // 导入对象有效性检查器

// 类型
type RuleKey = keyof TypeClassConfigDefaultValidator;

/**
 * 检查配置对象属性及类型
 *
 * @function CheckType
 *
 * @param { TypeClassConfig } classConfig 类配置对象
 * @param { { [propName: string]: any } } obj 需要查验的对象
 * @param { TypeClassConfigDefaultValidator } rules 规则
 *
 * @returns { { isValid: boolean, errors: Array<string>, tips: Array<string> } } 验证结果对象
 */
export function CheckType<MastCheckObject extends { [propName: string]: any }>(
    classConfig: TypeClassConfig,
    obj: MastCheckObject,
    rules: TypeClassConfigDefaultValidator
): {
    isValid: boolean,
    errors: Array<string>,
    tips: Array<string>
} {
    const errors: Array<string> = []; // 存储必需属性验证失败的信息
    const tips: Array<string> = []; // 存储非必需属性验证失败的信息和额外属性的提示信息

    /**
     * 添加错误信息
     * @function addError
     * @param { TypeClassConfigDefault[K] } rule 规则对象
     * @param { string } message 错误信息
     */
    const addError = <K extends RuleKey>(
        rule: TypeClassConfigDefaultValidator[K],
        message: string
    ): void => {
        rule.required ? errors.push(message) : tips.push(message);
    };

    /* ===== */

    // 验证对象有效性
    const _OBJ: { [key: string]: TypeClassConfigDefaultValueTypes } = ValidateObject(classConfig, obj); // 查验对象有效性

    // 获取所有属性名
    const objProps: Array<string> = Object.keys(_OBJ);
    const ruleProps: Array<string> = Object.keys(rules);

    // 检查额外属性
    for (const prop of objProps) {
        if (!ruleProps.includes(prop))
            tips.push(`Extra property found: "${prop}". This property is not defined in the validation rules.`);
    }

    // 遍历ruleProps数组
    for (const rulePropName of ruleProps) {
        // 获取rules对象中rulePropName对应的规则
        const rule: TypeClassConfigDefaultValidator[RuleKey] = rules[rulePropName];
        // 获取_OBJ对象中rulePropName对应的值
        const propValue: TypeClassConfigDefaultValueTypes | void = _OBJ.hasOwnProperty(rulePropName) ? _OBJ[rulePropName] : void 0;

        // 如果规则要求该属性必须存在，但_OBJ对象中该属性不存在，则添加错误信息
        if (rule.required && propValue === void 0) {
            addError(rule, `Missing required property: "${rulePropName}"`);
            continue;
        }

        // 如果规则不要求该属性必须存在，但_OBJ对象中该属性不存在，则跳过
        if (!rule.required && propValue === void 0) continue;

        // 如果规则要求该属性的类型，但_OBJ对象中该属性的值类型不匹配，则添加错误信息
        if (rule.type &&
            typeof propValue !== rule.type
        ) addError(rule, `Property "${rulePropName}" must be of type "${rule.type}", but was "${typeof propValue}"`);

        // 如果规则要求该属性必须通过验证器验证，但_OBJ对象中该属性的值未通过验证器验证，则添加错误信息
        if (rule.validator &&
            propValue !== void 0 &&
            !rule.validator(propValue)
        ) addError(rule, rule.errorMessage || `Property "${rulePropName}" failed validation.`);
    }

    // 返回包含验证结果的对象
    return {
        isValid: errors.length === 0,
        errors,
        tips
    };
}