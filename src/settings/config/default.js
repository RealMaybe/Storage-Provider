/* 参数方法 */
import {
    $Object, // 对象有效性验证
} from "../../methods/Parameter.js";

/* ========== */

/**
 * 创建一个设置对象，用于管理应用程序的配置选项。
 * 
 * @function $Settings
 * 
 * @param { object | string } options 配置选项对象
 * @param { string } [options.type] 存储类型
 * @param { number } [options.maxSize] 最大存储大小，单位为字节
 * @param { boolean } [options.warn] 是否在控制台弹出警告信息
 * 
 * @throws 抛出错误：传入参数不为对象或者指定字符串
 * 
 * @returns { object } 返回合并了默认选项和传入选项的新配置对象
 */
export function $Settings(options) {
    // 默认配置
    const defaultOptions = {
        type: "local", // 默认存储类型 localStorage
        maxSize: 1048576, // 最大存储大小 1,048,576 字节，即 1MB
        warn: true // 是否在控制台弹出警告信息
    };

    // 对传入的参数进行类型及有效性验证
    const _OPTIONS = $Object({ warn: true }, (param => {
        // 参数是指定字符串，转为对象形式返回
        if (typeof param === "string" && (param === "local" || param === "session"))
            return { type: param }

        // 参数为对象，且不为数组，验证传入的对象是否包含指定属性
        else if (!Array.isArray(param) && typeof param === "object") {
            const propertiesToCheck = [
                "type", // 存储类型
                "maxSize", // 最大存储大小
                "warn", // 是否在控制台弹出警告信息
                // "encrypt", // 是否加密存储
                // "compress", // 是否压缩存储
                // "expiration", // 过期时间
                // "time", // 存储时间
                // "prefix" // 前缀
            ];

            // 检查配置对象中是否包含指定的属性，如果不包含则抛出错误
            if (!propertiesToCheck.some(prop => param.hasOwnProperty(prop))) {
                const missingProperties = propertiesToCheck.join("', '");
                throw new Error(`The configuration object must contain at least one of the following attributes: '${missingProperties}'.`)
            }

            return param
        }

        // 参数为其他类型：抛出报错
        else
            throw new Error("Please pass in a valid 'string' or 'object' parameter and try again.")
    })(options));

    // 未传入配置，则使用默认配置；传入配置，则使用新配置
    return {...defaultOptions, ..._OPTIONS }
}