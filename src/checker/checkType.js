/* 检查对象属性及类型 */

// 导入依赖
import { ValidateObject } from "../validate/ValidateObject.js"; // 导入对象有效性检查器

/**
 * 检查对象属性及类型
 *
 * @function CheckType
 *
 * @param { { storageType: string, warn: boolean } } classConfig 需要检查的对象
 * @param { { [rulesPropName: string]: { type: string, required: boolean, validator: Function, errorMessage: string }} } rules 规则对象
 *
 * @returns { { isValid: boolean, errors: Array<string>, tips: Array<string> } } 验证结果对象
 */
export function CheckType(classConfig, rules) {
    const errors = []; // 存储必需属性验证失败的信息
    const tips = []; // 存储非必需属性验证失败的信息和额外属性的提示信息

    /**
     * 添加错误信息
     * @function addError
     * @param { { required: boolean } } rule 规则对象
     * @param { string } message 错误信息
     */
    const addError = (rule, message) => { rule.required ? errors.push(message) : tips.push(message) };

    /* ===== */

    // 验证对象有效性
    const _OBJ = ValidateObject({
        warn: typeof classConfig.warn === "boolean" ? classConfig.warn : true,
    }, classConfig); // 查验对象有效性

    // 获取所有属性名
    const objProps = Object.keys(_OBJ);
    const ruleProps = Object.keys(rules);

    // 检查额外属性
    for (const prop of objProps) {
        if (!ruleProps.includes(prop))
            tips.push(`Extra property found: "${prop}". This property is not defined in the validation rules.`);
    }

    // 遍历ruleProps数组
    for (const rulePropName of ruleProps) {
        // 获取rules对象中rulePropName对应的规则
        const rule = rules[rulePropName];
        // 获取_OBJ对象中rulePropName对应的值
        const propValue = _OBJ.hasOwnProperty(rulePropName) ? _OBJ[rulePropName] : undefined;

        // 如果规则要求该属性必须存在，但_OBJ对象中该属性不存在，则添加错误信息
        if (rule.required && propValue === undefined) {
            addError(rule, `Missing required property: "${rulePropName}"`);
            continue;
        }

        // 如果规则不要求该属性必须存在，但_OBJ对象中该属性不存在，则跳过
        if (!rule.required && propValue === undefined) continue;

        // 如果规则要求该属性的类型，但_OBJ对象中该属性的值类型不匹配，则添加错误信息
        if (rule.type && typeof propValue !== rule.type)
            addError(rule, `Property "${rulePropName}" must be of type "${rule.type}", but was "${typeof propValue}"`);

        // 如果规则要求该属性必须通过验证器验证，但_OBJ对象中该属性的值未通过验证器验证，则添加错误信息
        if (rule.validator && propValue !== undefined && !rule.validator(propValue))
            addError(rule, rule.errorMessage || `Property "${rulePropName}" failed validation.`);

        // 如果规则允许的值存在，属性值不为undefined，且属性值不在规则允许的值中
        // 则添加错误，属性值必须是规则允许的值之一，但实际值为propValue
        if (rule.allowedValues && propValue !== undefined && !rule.allowedValues.includes(propValue))
            addError(rule, `Property "${rulePropName}" must be one of the following values: "${rule.allowedValues.join("', '")}", but was "${propValue}"`);
    }

    // 返回包含验证结果的对象
    return { isValid: errors.length === 0, errors, tips, };
}