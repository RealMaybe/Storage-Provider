/* 标准化传入的配置信息 */


import {
    type UserOptionsType,
    type UserOptionsObjectType,
    type ClassOptionsType,
    type RealClassConfigType,
} from "../tsType/classConfigType";
import { configRuleType } from "./configRuleType";
import { configChecker } from "./configChecker";
import { configDefault } from "./configDefault";
import { configObjectAttributeValidate } from "./configObjectAttributeValidate"
import {
    checkType,
    isArray,
    isString,
    isInvalid,
    isObjectAndNotArray
} from "../type/checkType";


/* ========== */


/**
 * 验证和处理类配置对象
 * 
 * @function Settings
 * @param { UserOptionsType } userConfig 配置项
 * - 可以是字符串
 * - 也可以是包含配置属性的对象
 * @returns { ClassOptionsType } 验证后的配置对象。
 * @throws { Error } 如果配置验证失败，则抛出错误。
 */
export function Settings(
    userConfig: UserOptionsType
): ClassOptionsType {
    if (
        isArray(userConfig) &&
        isInvalid(userConfig)
    ) throw new Error(`Please pass in a valid "string" or "object" parameter and try again.`);

    let configObject: ClassOptionsType = (() => {
        // 如果传入的是字符串，检查是否为有效的存储类型
        if (isString(userConfig)) {
            if (userConfig === "local" || userConfig === "session")
                return { ...configDefault, storageType: userConfig } as ClassOptionsType;

            else if (!configRuleType.storageType.validator(userConfig))
                throw new Error(configRuleType.storageType.errorMessage);
        }

        // 如果传入的是对象，检查对象属性
        else if (isObjectAndNotArray(userConfig)) {
            const { valid, value } = configObjectAttributeValidate(userConfig as UserOptionsObjectType);

            if (valid) return { ...configDefault, ...value } as ClassOptionsType;
        }

        // 传入的值无效
        else throw new Error(`Please pass in a valid "string" or "object" parameter and try again.`);
    })() ?? { ...configDefault } as ClassOptionsType;

    // 检查验证结果  
    const { isValid, errors, tips } = configChecker(configObject, configObject, configRuleType)

    // 输出错误信息
    if (!isValid)
        throw new Error(`Validation failed:\n${errors.map(err => `- ${err}`).join("\n")}`);
    else if (
        isValid &&
        configObject.warn &&
        tips.length > 0
    ) console.warn(`Warning:\n${tips.map(tip => `- ${tip}`).join("\n")}`);

    // 返回配置对象
    return configObject;
};
