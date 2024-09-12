/* 参数属性类型 */

/* 
类型 type
是否必须 required
允许值 allowedValues
检查器 validator
错误信息 errorMessage
*/

// 存储类型
let storageType = {
    type: "string",
    required: true,
    // allowedValues: ["local", "session"],
    validator: value => ["local", "session"].includes(value),
    errorMessage: `"storageType" property value is invalid. It must be "local" or "session".`
};

// 最大容量
let maxSize = {
    type: "number",
    required: true,
    // allowedValues: null,
    validator: value =>
        typeof value === "number" &&
        Number.isInteger(value) &&
        value > 0 &&
        value <= 5242880,
    errorMessage: `The "maxSize" property value is invalid. It must be a positive integer less than or equal to 5242880.`
};

// 警告
let warn = {
    type: "boolean",
    required: true,
    // allowedValues: [true, false],
    validator: value => typeof value === "boolean",
    errorMessage: `The "warn" property value is invalid. It must be true or false.`
};

// 循环引用检查
let circular = {
    type: "boolean",
    required: false,
    // allowedValues: [true, false],
    validator: value => typeof value === "boolean",
    errorMessage: `The "circular" property value is invalid. It must be true or false.`
};

// 加密
let encrypt = {
    type: "boolean",
    required: false,
    // allowedValues: [true, false],
    validator: value => typeof value === "boolean",
    errorMessage: `The "encrypt" property value is invalid. It must be true or false.`
};

// 压缩
let compress = {
    type: "boolean",
    required: false,
    // allowedValues: [true, false],
    validator: value => typeof value === "boolean",
    errorMessage: `The "compress" property value is invalid. It must be true or false.`
};

// 过期时间
let expirationTime = {
    type: "number",
    required: false,
    // allowedValues: null,
    validator: value => {
        if (typeof value !== "number" || value <= 0) return false;

        // 获取当前时间的时间戳（毫秒）  
        const currentTime = Date.now();

        // 计算十分钟后的时间戳  
        const tenMinutesLater = currentTime + (60 * 1000 * 10); // 60秒 * 1000毫秒/秒 * 10分钟  

        // 验证 value 是否至少是当前时间的十分钟之后  
        return value > tenMinutesLater;
    },
    errorMessage: `The "expirationTime" property value is invalid. It must be a timestamp representing a time at least ten minutes in the future.`
};

// 存储时间
let storageTime = {
    type: "number",
    required: false,
    // allowedValues: null,
    validator: () => null,
    errorMessage: "Invalid time. It must be a positive number."
};

// 前缀
let prefix = {
    type: "string",
    required: false,
    // allowedValues: null,
    validator: value =>
        typeof value === "string" &&
        value.trim().length > 0 &&
        value.trim().length <= 5,
    errorMessage: "Invalid prefix. It must be a string."
};


// 导出参数属性类型
export const parameterType = {
    storageType,
    maxSize,
    warn,
    circular,
    encrypt,
    compress,
    expirationTime,
    storageTime,
    prefix
};