/* 查验配置对象以确保它包含所有必需的属性 */

/**
 * 验证设置对象以确保它包含所有必需的属性。
 * 如果对象包含等价属性（例如 'type' 和 'storageType'），
 * 它将根据equivalentAttributes映射中指定的主要属性标准化属性。
 * @function configObjectChecker
 * 
 * @param { object } settings 要验证的设置对象。
 * 
 * @returns { { valid: boolean, value: object } } 如果所有必需属性都存在，则返回验证后的设置对象。
 * 
 * @throws { Error } 如果设置对象无效或缺少任何必需属性，则抛出错误。
 */
export function configObjectChecker(settings) {
    const CONFIG = ((set) => {
            if (typeof settings !== "object" || settings === null)
                throw new Error("The configuration object must be an object.");
            else return set
        })(settings) // 查验对象有效性

    // 必需属性
    const requiredAttributes = ["storageType", "warn"];

    // 等价属性
    const equivalentAttributes = {
        "storageType": ["type"]
    };

    // 标准化等价属性
    for (const [primaryAttr, equivalents] of Object.entries(equivalentAttributes)) {
        if (!CONFIG.hasOwnProperty(primaryAttr) || CONFIG[primaryAttr] === void 0)
            for (const equivalent of equivalents) {
                if (CONFIG.hasOwnProperty(equivalent)) {
                    CONFIG[primaryAttr] = CONFIG[equivalent];
                    delete CONFIG[equivalent];
                    break;
                }
            }
    }

    // 查验必需属性
    const missingAttributes = requiredAttributes.filter(prop => !CONFIG.hasOwnProperty(prop) || CONFIG[prop] === void 0);

    if (missingAttributes.length > 0) {
        const missingList = missingAttributes.join('", "');

        throw new Error(`The configuration object must contain all of the following attributes: "${missingList}".`);
    }

    return {
        valid: true,
        value: CONFIG
    };
}