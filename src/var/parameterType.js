/* 参数属性类型 */

// 导出参数属性类型
export const parameterType = {
    // 存储类型
    storageType: {
        type: "string",
        required: true,
        // allowedValues: ["local", "session"],
        validator: value => ["local", "session"].includes(value),
        errorMessage: `"storageType" property value is invalid. It must be "local" or "session".`
    },
    // 是否警告
    warn: {
        type: "boolean",
        required: true,
        // allowedValues: [true, false],
        validator: value => typeof value === "boolean",
        errorMessage: `The "warn" property value is invalid. It must be true or false.`
    },
    // 是否检查循环引用
    circular: {
        type: "boolean",
        required: false,
        // allowedValues: [true, false],
        validator: value => typeof value === "boolean",
        errorMessage: `The "circular" property value is invalid. It must be true or false.`
    },
    // 最大存储大小
    maxSize: {
        type: "number",
        required: false,
        // allowedValues: null,
        validator: value =>
            typeof value === "number" &&
            Number.isInteger(value) &&
            value > 0 &&
            value <= 5242880,
        errorMessage: `The "maxSize" property value is invalid. It must be a positive integer less than or equal to 5242880.`
    },
};