/* 参数属性类型创建器 */

/**
 * 布尔值验证器工厂函数
 * @function booleanValidator
 * @param { boolean } required 属性是否是必须的
 * @param { string } name 属性名称
 * @returns { { validator: (value: any) => boolean, errorMessage: string } } 包含布尔值验证器和错误信息的对象
 */
const booleanValidator = name => ({
    validator: value => typeof value === "boolean",
    errorMessage: `The "${name}" property value is invalid. It must be true or false.`
});

/**
 * 字符串验证器工厂函数
 * @function stringValidator
 * @param { number } minLength 字符串的最小长度
 * @param { number } maxLength 字符串的最大长度
 * @param { string } name 属性名称
 * @returns { { validator: (value: any) => boolean, errorMessage: string } } 包含字符串验证器和错误信息的对象
 */
const stringValidator = (minLength, maxLength, name) => ({
    validator: value =>
        typeof value === "string" &&
        value.trim().length >= minLength &&
        value.trim().length <= maxLength,
    errorMessage: `The "${name}" property value is invalid. It must be a string with length between ${minLength} and ${maxLength}.`
});

/**
 * 数字验证器工厂函数
 * @function numberValidator
 * @param { Array<string> } conditions 数字需要满足的条件数组，例如 [">0", "<=5"]
 * @param { string } errorMessage 验证失败时的错误信息
 * @returns { { validator: (value: any) => boolean, errorMessage: string } } 包含数字验证器和错误信息的对象
 */
const numberValidator = (conditions, errorMessage) => ({
    validator: value => {
        /**
         * 尝试将条件字符串转换为对象
         * @param { string } str 条件字符串 
         * @returns { { operator: string, number: number } } 条件对象
         */
        const splitByOperator = (str) => {
            const regex = /(<=|>=|<|>|==|!=)(\d+)/;
            const match = str.match(regex);
            if (match) return {
                operator: match[1],
                number: parseInt(match[2], 10)
            };
            else return null;
        };

        /* ===== */

        // 检查值是否为整数
        if (typeof value !== "number" ||
            !Number.isInteger(value)
        ) return false;

        // 检查所有条件是否满足
        return conditions.every(condition => {
            const result = splitByOperator(condition);

            if (!result) {
                console.error(`Invalid condition format: ${condition}. It should match the regex pattern.`);
                return false;
            }

            const { operator, number } = result;

            // 根据操作符进行比较
            switch (operator) {
                case ">":
                    return value > number;
                case "<":
                    return value < number;
                case ">=":
                    return value >= number;
                case "<=":
                    return value <= number;
                case "==":
                    return value === number;
                case "!=":
                    return value !== number;
                default:
                    console.error(`Unsupported operator: ${operator}.`);
                    return false;
            }
        });

    },
    errorMessage: errorMessage
});

/**
 * 创建属性定义的工厂函数
 * @function createConfig
 * @param { string } type 属性的类型
 * @param { boolean } required 属性是否是必须的
 * @param { { validator: (value: any) => boolean, errorMessage: string } } validatorObject 包含验证器和错误信息的对象
 * @returns { { type: string, required: boolean, validator: (value: any) => boolean, errorMessage: string } } 包含类型、必填性、验证器和错误信息的对象
 */
const createConfig = (type, required, validatorObject, defaultValue) => ({
    type, // 类型
    required, // 是否必填
    validator: validatorObject.validator, // 验证器
    errorMessage: validatorObject.errorMessage, // 错误信息
    defaultValue, // 默认值
});



/* ========== */



export const typeCreator = (($type) => {
    // 存储类型
    $type.storageType = createConfig(
        "string",
        true, {
            validator: value => ["local", "session"].includes(value),
            errorMessage: `"storageType" property value is invalid. It must be "local" or "session".`
        },
        "local"
    );

    // 是否打印警告
    $type.warn = createConfig(
        "boolean",
        true,
        booleanValidator("warn"),
        true
    );

    // 是否自动去除循环引用
    $type.circular = createConfig(
        "boolean",
        false,
        booleanValidator("circular"),
        false
    );

    // 最大存储大小
    $type.maxSize = createConfig(
        "number",
        false,
        numberValidator([">0", "<=5242880"], `The "maxSize" property value is invalid. It must be a positive integer less than or equal to 5242880.`),
        1048576
    );

    // 是否监控数据变化
    $type.monitor = createConfig(
        "boolean",
        false,
        booleanValidator("monitor"),
        false
    );

    // 前缀
    $type.prefix = createConfig(
        "string",
        false,
        stringValidator(1, 10, "prefix"),
        "myApp_"
    );

    // 是否加密
    /* $type.encrypt = createConfig(
        "boolean",
        false,
        booleanValidator("encrypt"),
        false
    ); */

    // 是否压缩
    /* $type.compress = createConfig(
        "boolean",
        false,
        booleanValidator("compress"),
        false
    ); */

    // 过期时间
    /* $type.expirationTime = createConfig(
        "number",
        false, {
            validator: value => {
                if (typeof value !== "number" || value <= 0) return false;
                const currentTime = Date.now();
                const tenMinutesLater = currentTime + (60 * 1000 * 10);
                return value > tenMinutesLater;
            },
            errorMessage: `The "expirationTime" property value is invalid. It must be a timestamp representing a time at least ten minutes in the future.`
        },
        null
    ); */

    // 存储时间
    /* $type.storageTime = createConfig(
        "number",
        false, {
            validator: value => typeof value === "number" && value > 0,
            errorMessage: "Invalid time. It must be a positive number."
        },
        null
    ); */

    return $type;
})({});