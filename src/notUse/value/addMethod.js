/**
 * 实现函数重载的方法
 * 
 * @returns { Function } 重载函数 
 */
export function createOverload() {
    // 创建一个 Map 来存储不同参数类型的函数实现
    const fnMap = new Map();

    /**
     * 重载函数，根据传入参数的类型和数量调用不同的函数实现
     * 
     * @param { ...any } args 传入的参数
     * @returns { any } 返回对应函数实现的结果
     * @throws { TypeError } 如果没有找到对应的函数实现，则抛出 TypeError
     */
    function overload(...args) {
        // 根据参数类型生成一个唯一的键
        const key = args.map(i => Object.prototype.toString.call(i).slice(8, -1).toLowerCase()).join(",");

        // 查找对应的函数实现
        const fn = fnMap.get(key);

        // 如果没有找到对应的函数实现，则抛出 TypeError
        if (!fn) throw new TypeError("No corresponding function found.");

        // 调用对应的函数实现，并传递原始参数
        return fn.apply(this, args);
    };

    /**
     * 向重载函数添加新的函数实现
     * 
     * @param { ...any } args 参数类型和最后一个参数为函数实现
     * @throws { TypeError } 如果最后一个参数不是函数，则抛出 TypeError
     */
    overload.addImpl = function(...args) {
        // 移除最后一个参数（即函数实现）
        const fn = args.pop();

        // 检查最后一个参数是否为函数
        if (typeof fn !== "function")
            throw new TypeError("Last argument must be a function.");

        // 根据剩余参数生成键
        const key = args.join(",");

        // 将键和对应的函数实现存储在 fnMap 中
        fnMap.set(key, fn);
    };

    // 返回重载函数
    return overload;
};