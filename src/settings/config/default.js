/* 参数方法 */
import {
    $Object, // 对象有效性验证
} from "../../methods/Parameter.js";

/* ========== */

/**
 * 创建一个设置对象，用于管理应用程序的配置选项。
 * @param { object } options 配置选项对象。
 * @param { string } [options.type] 存储类型
 * @param { number } [options.maxSize] 最大存储大小，单位为字节
 * @param { boolean } [options.expiration] 存储是否过期
 * @param { number } [options.time] 存储的过期时间，单位为毫秒
 * @param { string } [options.prefix] 存储的 key 的前缀，用于配置过期使用
 * @param { boolean } [options.warn] 是否在控制台弹出警告信息
 * @returns { object } 返回合并了默认选项和传入选项的新配置对象。
 */
export function $Settings(options) {
    // 有效性验证
    const OPTIONS_ = $Object({ warn: true }, options);

    // 默认配置
    const defaultOptions = {
        type: "local", // 默认存储类型 localStorage
        maxSize: 1048576, // 最大存储大小 1,048,576 字节，即 1MB
        expiration: false, // 存储是否过期
        time: 86400000, // 存储的过期时间 86,400,000 毫秒，即 24 小时
        prefix: "myApp_", // 存储的 key 的前缀，用于配置过期使用
        warn: true, // 是否在控制台弹出警告信息
    };

    return {...defaultOptions, ...OPTIONS_ };
}