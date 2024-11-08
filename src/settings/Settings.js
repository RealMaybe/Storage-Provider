/* 配置对象查验器 */

// 导入依赖
import { configDefault } from "./configDefault.js"; // 导入默认配置
import { configObjectChecker } from "./configObjectChecker.js"; // 导入配置对象查验器
import { configRuleType } from "./configRuleType.js"; // 导入参数类型
import { CheckType } from "../checker/checkType.js"; // 导入参数类型验证器

/**
 * 验证配置对象
 * 
 * @function Settings
 * 
 * @param { string | object } classConfig 配置对象，可以是字符串或包含配置属性的对象。
 * @param { string } [classConfig.storageType] 存储类型，必须是 "local" 或 "session"。
 * @param { boolean } [classConfig.warn] 是否显示警告。
 * @param { boolean } [classConfig.circular] 是否检查循环引用（可选）。
 * @param { number } [classConfig.maxSize] 最大存储大小（可选）。
 * @param { boolean } [classConfig.monitor] 是否监控存储变化（可选）。
 * @param { string } [classConfig.prefix] 存储项的前缀（可选）。
 * 
 * @returns { object } 验证后的配置对象。
 * 
 * @throws { Error } 如果配置验证失败，则抛出错误。
 */
export function Settings(classConfig) {
    // 检查 classConfig 是否为有效的字符串或对象
    if (
        classConfig === null ||
        classConfig === undefined ||
        Array.isArray(classConfig) ||
        (!typeof classConfig === "object" || !typeof classConfig === "string") ||
        (!classConfig === "local" || !classConfig === "session")
    ) throw new Error(`Please pass in a valid "string" or "object" parameter and try again.`);

    // 定义最终的配置对象
    const CONFIG_OBJ = (() => {
        // 如果传入的是字符串，检查是否为有效的存储类型
        if (typeof classConfig === "string" && (classConfig === "local" || classConfig === "session"))
            return {...configDefault, storageType: classConfig };

        // 如果传入的是对象，检查对象属性
        else if (typeof classConfig === "object") {
            const { settingsValid, settingsValue } = configObjectChecker(classConfig);

            if (settingsValid) return {...configDefault, ...settingsValue };
        }
    })();

    // 检查验证结果  
    const { isValid, errors, tips } = CheckType(CONFIG_OBJ, configRuleType)

    // 输出错误信息
    if (!isValid)
        throw new Error(`Validation failed:\n${errors.map(err => `- ${err}`).join("\n")}`);
    else if (isValid && CONFIG_OBJ.warn && tips.length > 0)
        console.warn(`Warning:\n${tips.map(tip => `- ${tip}`).join("\n")}`)
    
    // 返回配置对象
    return CONFIG_OBJ;
}