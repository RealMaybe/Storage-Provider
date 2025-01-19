/* 配置对象查验器 */

// 导入依赖
import { configDefault } from "./configDefault.js"; // 导入默认配置
import { configObjectChecker } from "./configObjectChecker.js"; // 导入配置对象查验器
import { configRuleType } from "./configRuleType.js"; // 导入参数类型
import { CheckType } from "../checker/checkType.js"; // 导入参数类型验证器
import { CheckStorageSize } from "../checker/checkStorageSize.js";

/* ========== */

/**
 * 验证配置对象
 * 
 * @function Settings
 * 
 * @param { string | userConfig } userConfig 配置项
 * - 可以是字符串
 * - 也可以是包含配置属性的对象
 * 
 * @returns { { storageType: string, warn: boolean, circular: boolean, maxSize: number, monitor: boolean, prefix: string} } 验证后的配置对象。
 * 
 * @throws { Error } 如果配置验证失败，则抛出错误。
 */
export function Settings(userConfig) {
    // 检查 userConfig 是否为有效的字符串或对象
    if (
        userConfig === null ||
        userConfig === void 0 ||
        Array.isArray(userConfig)
    ) throw new Error(`Please pass in a valid "string" or "object" parameter and try again.`);

    // 定义最终的配置对象
    const CONFIG_OBJ = (() => {
        // 如果传入的是字符串，检查是否为有效的存储类型
        if (typeof userConfig === "string") {
            if (userConfig === "local" || userConfig === "session")
                return {...configDefault, storageType: userConfig };

            else if (!configRuleType.storageType.validator(userConfig))
                throw new Error(configRuleType.storageType.errorMessage);
        }

        // 如果传入的是对象，检查对象属性
        else if (typeof userConfig === "object") {
            const { valid, value } = configObjectChecker(userConfig);

            if (valid) return {...configDefault, ...value };
        }

        // 传入的值无效
        else throw new Error(`Please pass in a valid "string" or "object" parameter and try again.`);
    })();

    // 检查验证结果  
    const { isValid, errors, tips } = CheckType(CONFIG_OBJ, CONFIG_OBJ, configRuleType)

    // 输出错误信息
    if (!isValid)
        throw new Error(`Validation failed:\n${errors.map(err => `- ${err}`).join("\n")}`);
    else if (
        isValid &&
        CONFIG_OBJ.warn &&
        tips.length > 0
    ) console.warn(`Warning:\n${tips.map(tip => `- ${tip}`).join("\n")}`);

    // 返回配置对象
    return CONFIG_OBJ;
}