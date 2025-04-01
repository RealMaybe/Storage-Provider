/* 创建属性定义的工厂函数 */


import { type Rule } from "../../scriptType/optionsRulesType"

/* ========== */


/**
 * 创建属性定义的工厂函数
 * @function createConfigFactory
 * @param { string } type 属性的类型
 * @param { boolean } required 属性是否是必须的
 * @param { { validator: (value: any) => boolean, errorMessage: string } } validatorObject 包含验证器和错误信息的对象
 * @param { any } defaultValue 属性的默认值
 * @returns { Rule } 包含类型、必填性、验证器和错误信息的对象
 */
export const createConfigFactory = (
    type: string,
    required: boolean,
    validatorObject: {
        validator: (value: any) => boolean,
        errorMessage: string
    },
    defaultValue: any
): Rule => ({
    type, // 类型
    required, // 是否必填
    validator: validatorObject.validator, // 验证器
    errorMessage: validatorObject.errorMessage, // 错误信息
    defaultValue, // 默认值
});