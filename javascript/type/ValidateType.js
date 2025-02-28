import { typeValidator } from "../type/typeValidator.js"; // 类型验证器

/**
 * 类型验证器
 * @param { any } value 需要验证的值
 * @param { string } type 期望类型
 * @return { boolean } 是否符合期望类型
 */
export function ValidateType(value, type) {
    if (typeValidator[type])
        return typeValidator[type](value);

    return false;
};