/* 查验配置对象以确保它包含所有必需的属性 */


import { isObjectAndNotArray } from "../../typeChecker";


/* ========== */


/**
 * 用于标准化对象属性的映射
 * @param { T } obj 需要标准化的对象
 * @param { { [key: string]: Array<keyof T> } } equivalentAttributes 属性映射
 * @returns { T } 标准化后的对象
 */
function standardizeObject<T extends { [key: string]: any }>(
    obj: T,
    equivalentAttributes: {
        [key in keyof T]: Array<keyof T>
    }
): T {
    const standardizedObj: { [key: string]: any } = {};

    for (let key in obj) {
        let foundStandardKey = false;

        for (let standard in equivalentAttributes) {
            if (equivalentAttributes[standard].includes(key as keyof T)) {
                standardizedObj[standard] = obj[key];
                foundStandardKey = true;
                break;
            }
        }

        if (!foundStandardKey) standardizedObj[key] = obj[key];
    }

    return standardizedObj as T;
};


/* ========== */


/**
 * 验证设置对象以确保它包含所有必需的属性。
 * 如果对象包含等价属性（例如 'type' 和 'storageType'），
 * 它将根据equivalentAttributes映射中指定的主要属性标准化属性。
 * @function configObjectAttributeValidate
 * 
 * @param { UserOptionsObjectType } userConfig 要验证的设置对象。
 * @param { { required: Array<keyof UserOptionsObjectType>, equivalent: { [K in keyof UserOptionsObjectType]: Array<keyof UserOptionsObjectType> } } } [attributeMapping] 属性映射，指定必需属性和等价属性。
 * 
 * @returns { { valid: boolean, value: object } } 如果所有必需属性都存在，则返回验证后的设置对象。
 * 
 * @throws { Error } 如果设置对象无效或缺少任何必需属性，则抛出错误。
 */
export function configObjectAttributeValidate<T extends { [key: string]: any }>(
    userConfig: T,
    attributeMapping: {
        required: Array<keyof T>,
        equivalent: {
            [K in keyof T]: Array<keyof T>;
        }
    }
): {
    valid: boolean,
    value: T
} {
    const CONFIG: T = ((set) => {
        if (!isObjectAndNotArray(set))
            throw new TypeError("The configuration object must be an object.");
        else return set
    })(userConfig) // 查验对象有效性

    const { required, equivalent } = attributeMapping;

    // 标准化等价属性
    const NEW_CONFIG = standardizeObject(CONFIG, equivalent);

    // 查验必需属性
    const missingAttributes = required.filter(prop => !NEW_CONFIG.hasOwnProperty(prop) || NEW_CONFIG[prop] === void 0);

    if (missingAttributes.length > 0) {
        const missingList = missingAttributes.join('", "');

        throw new TypeError(`The configuration object must contain all of the following attributes: "${missingList}".`);
    }

    return {
        valid: true,
        value: NEW_CONFIG as T
    }
};