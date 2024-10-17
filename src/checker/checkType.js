/* 检查配置对象属性及类型 */

// 导入依赖
import { ValidateObject } from "../validate/ValidateObject.js"; // 导入对象有效性检查器

/**
 * 检查配置对象属性及类型
 *
 * @function CheckType
 *
 * @param { { storageType: string, maxSize: number, warn: boolean } } classConfig 需要检查的配置对象
 * @param { { [key: string]: { type: string, required: boolean, allowedValues?: Array<any>, validator: function, errorMessage: string }} } rules 规则对象
 *
 * @returns { { isValid: boolean, errors: Array<string>, tips: Array<string> } } 验证结果对象
 */
export function CheckType(classConfig, rules) {
    const errors = []; // 存储必需属性验证失败的信息
    const tips = []; // 存储非必需属性验证失败的信息和额外属性的提示信息

    const _OBJ = ValidateObject({
        warn: typeof classConfig.warn === "boolean" ? classConfig.warn : true,
    }, classConfig); // 创建ValidateObject对象

    // 首先，遍历对象的所有属性，检查它们是否在规则中定义
    for (const objPropName in _OBJ) {
        // 如果属性在对象中但不在规则中，则添加到tips数组
        if (!rules.hasOwnProperty(objPropName))
            tips.push(`Extra property found: '${objPropName}'. This property is not defined in the validation rules.`);
    }

    // 然后，遍历rules对象进行验证
    for (const rulePropName in rules) {
        // if (!rules.hasOwnProperty(rulePropName)) continue; // 跳过非自身属性的处理（理论上不应该发生）

        const rule = rules[rulePropName]; // 获取当前属性的规则
        const propValue = _OBJ[rulePropName]; // 获取当前属性的值

        // 检查属性是否必需
        if (rule.required && !(rulePropName in _OBJ)) {
            errors.push(`Missing required property: '${rulePropName}'`);
            continue; // 跳过当前属性的进一步验证
        }

        // 如果属性存在，则进行验证
        if (rulePropName in _OBJ) {
            // 检查类型
            if (rule.type && typeof propValue !== rule.type)
                errors.push(
                    `Property '${rulePropName}' must be of type '${
                        rule.type
                    }', but was '${typeof propValue}'`
                );

            // 执行验证函数
            if (rule.validator && !rule.validator(propValue))
                errors.push(
                    rule.errorMessage ||
                    `Property '${rulePropName}' failed validation.`
                );

            // 检查是否有允许的值，并验证
            if (rule.allowedValues && !rule.allowedValues.includes(propValue))
                errors.push(
                    `Property '${rulePropName}' must be one of the following values: '${rule.allowedValues.join(
                        "', '"
                    )}', but was '${propValue}'`
                );
        }
    }

    // 返回包含验证结果的对象
    return {
        isValid: errors.length === 0,
        errors,
        tips,
    };
}