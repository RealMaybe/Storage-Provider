/* 检查两个对象是否拥有相同的键 */

/**
 * 检查两个对象是否拥有相同的键
 * @param { { [key: string]: any } } obj1 需要比较的对象 1
 * @param { { [key: string]: any } } obj2 需要比较的对象 2
 * @returns { { judge: boolean, missingKeys: Array<string>, extraKeys: Array<string> } } 是否拥有相同的键
 */
export function haveSameKeys(obj1, obj2) {
    const keys1 = new Set(Object.keys(obj1));
    const keys2 = new Set(Object.keys(obj2));

    let judge = true; // 判断结果，默认为 true
    let missingKeys = []; // 缺失的键，即 obj1 中有而 obj2 中没有的键
    let extraKeys = []; // 多余的键，即 obj2 中有而 obj1 中没有的键

    for (let key of keys1) {
        if (!keys2.has(key)) {
            judge = false;
            missingKeys.push(key);
        }
    }

    for (let key of keys2) {
        if (!keys1.has(key)) {
            judge = false;
            extraKeys.push(key);
        }
    }

    return { judge, missingKeys, extraKeys };
};