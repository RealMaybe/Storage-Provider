import { _Object } from "../../utils/Parameter.js";

/**
 * @function _Settings
 * @param { object } options 配置选项对象
 * @param { string } options.type 存储类型
 * @param { number } options.maxSize 存储的最大大小
 * @param { number } options.expiration 存储的过期时间
 * @param { string } options.prefix 存储的键的前缀
 * @param { boolean } options.compression 数据是否压缩
 * @param { boolean } options.encryption 数据是否加密
 * @param { boolean } options.backup 数据是否备份
 */
export function _Settings(options) {
    const OPTIONS_ = _Object(options);

    // 默认配置
    const defaultOptions = {
        type: "local", // 默认存储类型 localStorage
        maxSize: 5242880, // 最大存储大小 5242880 字节，即 5MB
        expiration: 86400000, // 存储的过期时间 86400000 毫秒，即 24 小时
        prefix: "myApp_" // 存储的 key 的前缀，用于配置过期使用
    };

    const config = {...defaultOptions, ...OPTIONS_ };

    return config
};