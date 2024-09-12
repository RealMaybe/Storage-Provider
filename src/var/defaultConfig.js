/* 默认配置 */

export const defaultConfig = {
    storageType: "local", // 存储类型
    maxSize: 1048576, // 最大存储大小，单位：字节，默认：1MB
    warn: true, // 是否开启警告提示
    circular: false, // 是否清除循环引用
};