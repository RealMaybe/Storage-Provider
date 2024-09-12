/* 配置对象查验器 */

// 导入依赖
import { defaultConfig } from "../var/defaultConfig.js"; // 导入默认配置
import { parameterType } from "../var/parameterType.js"; // 导入参数类型
import { CheckType } from "../checker/checkType.js"; // 导入参数类型验证器

/**
 * 验证配置对象
 * 
 * @function Settings
 * 
 * @param { string | { storageType: string, maxSize?: number, warn: boolean, circular?: boolean } } classConfig 配置对象
 * 
 * @returns { { storageType: string, maxSize: number, warn: boolean, circular: boolean } } 验证过后的配置对象
 * 
 * @throws { Error } 验证失败时抛出错误
 */
export function Settings(classConfig) {
    const requiredAttributes = ["storageType", "warn"]; // 必需属性

    // 检查 classConfig 是否为有效的字符串或对象
    if (
        classConfig === null ||
        classConfig === undefined ||
        Array.isArray(classConfig) ||
        (!typeof classConfig === "object" || !typeof classConfig === "string") ||
        (!classConfig === "local" || !classConfig === "session")
    ) throw new Error(`Please pass in a valid "string" or "object" parameter and try again.`);

    // 定义最终的配置对象
    const configObj = (() => {
        // 如果传入的是字符串
        if (typeof classConfig === "string" && (classConfig === "local" || classConfig === "session"))
            return {...defaultConfig, storageType: classConfig };

        // 如果传入的是对象
        else if (typeof classConfig === "object") {
            // 检查必需属性是否存在
            const missingAttributes = requiredAttributes.filter(prop => !classConfig.hasOwnProperty(prop));

            if (missingAttributes.length > 0) {
                const missingList = missingAttributes.join('", "');

                throw new Error(`The configuration object must contain all of the following attributes: "${missingList}".`);
            } else return {...defaultConfig, ...classConfig };
        }
    })();

    // 检查验证结果  
    const { isValid, errors, tips } = CheckType(configObj, parameterType)

    if (!isValid) {
        const errorMessage = errors.map(err => `- ${err}`).join("\n");

        throw new Error(`Validation failed:\n${errorMessage}`);
    } else {
        if (configObj.warn && tips.length > 0) {
            const tipMessage = tips.map(tip => `- ${tip}`).join("\n");

            console.warn(`Warning:\n${tipMessage}`)
        }

        return configObj;
    }
}