export type rulesPropName = "storageType" | "warn" | "circular" | "original" | "monitor" | "channelName" | "prefix" | "maxSize" | "ignore";

/**
 * 类配置对象检查器的子属性的规则类型
 * - type: 允许的类型（单个或多个）
 * - required: 是否必填
 * - validator: 自定义验证函数
 * - errorMessage: 验证失败时的错误信息
 * - defaultValue: 默认值
 */
export interface Rule {
    type: string | Array<string>,
    required: boolean,
    validator: (value: any) => boolean,
    errorMessage: string,
    defaultValue: any
};

/** 
 * 类配置对象检查器的规则类型
 */
export type ClassConfigOptionsRules = {
    [K in rulesPropName]: Rule
};

/**
 * 对象检查器的规则类型
 */
export type OptionsRules = {
    [objectKey: string]: Rule
};