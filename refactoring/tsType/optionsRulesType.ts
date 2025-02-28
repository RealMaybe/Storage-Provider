export type rulesPropName = "storageType" | "warn" | "circular" | "monitor" | "channelName" | "prefix" | "maxSize";

/**
 * 类配置对象检查器的子属性的规则类型
 */
export type Rule = {
    type: string,
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