/**
 * 一个处理非空对象的函数。
 * @function _Object
 * @param { object } obj - 一个非空对象。
 * @returns { object } - 返回一个非空的对象。
 * @throws { error } - 当对象为空或包含无效值时抛出错误。
 * @throws { error } - 当传入的参数不是对象时抛出错误。
 */
export function _Object(obj) {
    // obj 必须是一个非空对象，并且不能是数组。 
    // 这是为了确保只有键值对存在于 obj 中，而不是其他类型的数据。
    if (
        obj !== undefined &&
        obj !== null &&
        !Array.isArray(obj) &&
        typeof obj === "object"
    ) {
        const valid = (() => {
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    const value = obj[key];

                    if (value !== undefined && value !== null)
                        return true;
                    else
                        return false;
                }
            }
        })();

        if (JSON.stringify(obj) !== "{}" && valid === true)
            return obj;

        throw new Error("Object is empty or there is an invalid value in the object.");
    } else
        throw new Error("Invalid data type: The parameter passed in by this method must be of type object.");
};