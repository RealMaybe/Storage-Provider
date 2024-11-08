/* 查验配置对象以确保它包含所有必需的属性 */

// 导入依赖
import { ValidateObject } from "../validate/ValidateObject.js";

/**
 * 验证设置对象以确保它包含所有必需的属性。
 * 如果对象包含等价属性（例如 'type' 和 'storageType'），
 * 它将根据equivalentAttributes映射中指定的主要属性标准化属性。
 * @function configObjectChecker
 * 
 * @param { object } settings 要验证的设置对象。
 * 
 * @returns { { valid: boolean, value: object } } 如果所有必需属性都存在，则返回验证后的设置对象。
 * 
 * @throws { Error } 如果设置对象为null、undefined或缺少任何必需属性，则抛出错误。
 */
export function configObjectChecker(settings) {
    const CONFIG = ValidateObject({
        warn: typeof settings.warn === "boolean" ? settings.warn : true,
    }, settings); // 查验对象有效性

    // 必需属性
    const requiredAttributes = ["storageType", "warn"];

    // 等价属性
    const equivalentAttributes = {
        "storageType": ["type"]
    };

    // 查验等价属性
    for (let attr in equivalentAttributes) {
        if (equivalentAttributes.hasOwnProperty(attr)) {
            const equivalents = equivalentAttributes[attr];

            for (let i = 0; i < equivalents.length; i++) {
                const equivalent = equivalents[i];

                if (CONFIG.hasOwnProperty(equivalent)) {
                    CONFIG[attr] = CONFIG[equivalent];
                    delete CONFIG[equivalent];
                    break;
                }
            }
        }
    }

    // 查验必需属性
    const missingAttributes = requiredAttributes.filter(prop => !CONFIG.hasOwnProperty(prop) || CONFIG[prop] === undefined);

    if (missingAttributes.length > 0) {
        const missingList = missingAttributes.join('", "');

        throw new Error(`The configuration object must contain all of the following attributes: "${missingList}".`);
    }

    return {
        settingsValid: true,
        settingsValue: CONFIG
    };
}