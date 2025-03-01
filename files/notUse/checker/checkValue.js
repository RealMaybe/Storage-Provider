// 检查对象并发出警告

/**
 * 递归检查对象及其嵌套属性，对特定类型和条件发出警告，
 * 包括未定义值、函数、符号、大整数、数组、Map、Set、正则表达式、错误、循环引用和不可枚举属性。
 *
 * @param { any } obj 要检查的对象或值。
 */
function checkAndWarn(classConfig, obj) {
    // 创建一个WeakSet，用于存储已经遍历过的对象
    const seen = new WeakSet();
    // 定义需要发出警告的类型
    const warnTypes = ["function", "symbol", "bigint"];
    // 定义需要发出警告
    const warnContent = [];

    /**
     * 辅助函数，递归检查值并记录相应的警告。
     *
     * @param { any } value 当前被检查的值。
     * @param { string } path 表示当前值在对象层次结构中的路径字符串。
     */
    function checkValue(value, path) {
        if (value === void 0)
            warnContent.push(`Warning: Property at "${path}" is undefined.`);

        else if (warnTypes.includes(typeof value))
            warnContent.push(`Warning: Property at "${path}" is a ${typeof value}.`);

        else if (Array.isArray(value)) {
            warnContent.push(`Warning: Property at "${path}" is an Array.`);

            for (let i = 0; i < value.length; i++)
                checkValue(value[i], `${path}[${i}]`);
        }

        // 
        else if (value instanceof Map || value instanceof Set || value instanceof RegExp || value instanceof Error)
            warnContent.push(`Warning: Property at "${path}" is a ${value.constructor.name}.`);

        else if (typeof value === "object" && value !== null) {
            if (seen.has(value)) {
                warnContent.push(`Warning: Circular reference detected at "${path}".`);
                return;
            }

            seen.add(value);

            const allProps = Object.getOwnPropertyNames(value).concat(Object.getOwnPropertySymbols(value));
            for (const prop of allProps) {
                const propPath = `${path}.${prop.toString()}`;

                if (!Object.prototype.propertyIsEnumerable.call(value, prop))
                    warnContent.push(`Warning: Property at "${propPath}" is non-enumerable.`);
                if (Object.prototype.hasOwnProperty.call(value, prop) || typeof prop === "symbol")
                    checkValue(value[prop], propPath);
            }
        }
    }

    checkValue(obj, "obj");

    return warnContent;
}


function checkWarn(obj) {
    const seen = new WeakSet();

    function checkValue(value, path) {
        if (value === undefined) {
            console.warn(`Warning: Property at "${path}" is undefined.`);
        } else if (typeof value === 'function') {
            console.warn(`Warning: Property at "${path}" is a function.`);
        } else if (typeof value === 'symbol') {
            console.warn(`Warning: Property at "${path}" is a symbol.`);
        } else if (value instanceof Map) {
            console.warn(`Warning: Property at "${path}" is a Map.`);
        } else if (value instanceof Set) {
            console.warn(`Warning: Property at "${path}" is a Set.`);
        } else if (value instanceof RegExp) {
            console.warn(`Warning: Property at "${path}" is a RegExp.`);
        } else if (value instanceof Error) {
            console.warn(`Warning: Property at "${path}" is an Error.`);
        } else if (typeof value === 'bigint') {
            console.warn(`Warning: Property at "${path}" is a BigInt.`);
        } else if (typeof value === 'object' && value !== null) {
            if (seen.has(value)) {
                console.warn(`Warning: Circular reference detected at "${path}".`);
                return;
            }
            seen.add(value);

            // Check for non-enumerable properties
            const allProps = Object.getOwnPropertyNames(value).concat(Object.getOwnPropertySymbols(value));
            for (const prop of allProps) {
                if (!Object.prototype.propertyIsEnumerable.call(value, prop)) {
                    console.warn(`Warning: Property at "${path}.${prop.toString()}" is non-enumerable.`);
                }
            }

            for (const key in value) {
                if (Object.prototype.hasOwnProperty.call(value, key)) {
                    checkValue(value[key], `${path}.${key}`);
                }
            }

            const symbols = Object.getOwnPropertySymbols(value);
            for (const symbol of symbols) {
                checkValue(value[symbol], `${path}[${symbol.toString()}]`);
            }
        }
    }

    checkValue(obj, 'obj');
}

// 示例对象
let obj = {
    name: "Kimi",
    age: undefined,
    greet() {
        console.log("Hello!");
    },
    [Symbol("key1")]: "value1",
    date: new Date("2025-01-21"),
    map: new Map([
        ["key1", "value1"]
    ]),
    set: new Set([1, 2, 3]),
    regex: /pattern/,
    error: new Error("Something went wrong"),
    bigNumber: BigInt(123456789012345678901234567890n)
};

// 添加循环引用
obj.self = obj;

// 添加不可枚举属性
Object.defineProperty(obj, "hidden", {
    value: "hidden value",
    enumerable: false
});

// 检查并发出警告
checkAndWarn(obj);