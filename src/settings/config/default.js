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
 * 
 * @description 【以下的参数现行版本暂时无用】
 * @param { boolean } [options.expiration] 存储是否过期
 * @param { number } [options.time] 存储的过期时间，单位为毫秒
 * @param { string } [options.prefix] 存储的 key 的前缀，用于配置过期使用
 */
export function $Settings(options) {
    // 默认配置
    const defaultOptions = {
        type: "local", // 默认存储类型 localStorage
        maxSize: 1048576, // 最大存储大小 1,048,576 字节，即 1MB
        warn: true, // 是否在控制台弹出警告信息
        // expiration: false, // 存储是否过期
        // time: 86400000, // 存储的过期时间 86,400,000 毫秒，即 24 小时
        // prefix: "myApp_", // 存储的 key 的前缀，用于配置过期使用
    };

    // 对传入的参数进行类型及有效性验证
    const _OPTIONS = $Object({ warn: true }, (p => {
        // 参数是指定字符串，转为对象形式返回
        if (typeof p === "string" && (p === "local" || p === "session"))
            return { type: p }

        // 参数为对象，且不为数组，直接返回
        else if (!Array.isArray(p) && typeof p === "object")
            return p

        // 参数为其他类型：抛出报错
        else
            throw new Error("Please pass in a valid 'string' or 'object' parameter and try again.")
    })(options));

    // 未传入配置，则使用默认配置
    // 传入配置，则使用新配置
    return {...defaultOptions, ..._OPTIONS }
}