/**
 * 存储类型
 */
type webStorageType = "local" | "session";

/**
 * 只包含 storageType 属性的配置对象类型
 */
interface onlyHasStorageType {
    storageType: webStorageType;
    type?: never;
};

/**
 * 只包含 type 属性的配置对象类型
 */
interface onlyHasType {
    type: webStorageType;
    storageType?: never;
};

/**
 * 必须包含的属性
 */
interface mastHaveOptions {
    warn: boolean,
};

/**
 * 必填属性（storageType 和 type 互斥）
 */
type requiredAttributes = (onlyHasStorageType | onlyHasType) & mastHaveOptions;

/**
 * 可选属性
 */
type optionalAttribute = {
    circular?: boolean,
    maxSize?: number,
    original?: boolean,
    monitor?: boolean,
    channelName?: string,
    prefix?: string,
}

/**
 * 用户传入的配置对象的类型
 * - 【type 与 storageType 互斥，即 storageType 和 type 只能有一个有值】
 * - 【在 storageType 和 type 都有值的情况下，以 storageType 为准】
 * 
 * - storageType：存储类型
 *     - 可选值："local" 和 "session"
 * - type：存储类型
 *     - 可选值："local" 和 "session"
 * - warn：是否打印警告
 *     - 默认值：true
 * - circular：是否允许循环引用
 *     - 默认值：false
 * - maxSize：最大存储大小
 *     - 默认值：5242880
 * - monitor：是否开启监控
 *     - 默认值：false
 * - channelName：频道名称
 *     - 默认值："StorageProvider_Channel"
 * - prefix：前缀
 *     - 默认值："myApp_"
 */
type UserOptionsObject = requiredAttributes & optionalAttribute;

/**
 * 用户传入的配置对象的字符串类型
 */
type UserOptionsString = webStorageType;

/**
 * 用户传入的配置信息
 */
export type UserOptionsType = UserOptionsObject | UserOptionsString;

/**
 * 经过校验后的用户传入的配置信息
 */
export type UserOptionsObjectType = UserOptionsObject;

/**
 * 经过检查/校验/处理后的类配置对象类型
 */
export type ClassOptionsType = {
    storageType: webStorageType,
    warn: boolean,
    circular: boolean,
    maxSize: number,
    original: boolean,
    monitor: boolean,
    channelName: string,
    prefix: string,
};

/**
 * 实际 channel 的配置对象类型
 * - 如果 monitor 为 true，则 channel 为 BroadcastChannel
 * - 如果 monitor 为 false，则 channel 为 null
 */
type ChannelType<T extends boolean> = T extends true ? BroadcastChannel : null;

/**
 * 经过校验后的，实际使用的类配置对象类型
 */
export type RealClassConfigType<M extends boolean> = {
    storage: Storage, // 存储对象
    type: webStorageType, // 存储类型
    warn: boolean, // 是否弹出警告信息
    circular: boolean, // 是否去除循环引用
    original: boolean, // 是否输出原始值
    monitor: M, // 是否监控存储变化
    channel: ChannelType<M>; // 根据 monitor 决定 channel 类型
};

/**
 * 辅助函数配置对象类型
 */
type AuxiliaryFunctionConfigurationObject = {
    warn: boolean, // 是否弹出警告信息
} & ({
    circular?: boolean, // 是否去除循环引用
} | {
    monitor: boolean, // 是否监控存储变化
    channel: BroadcastChannel; // 根据通讯频道类型
});

/**
 * 辅助函数配置对象类型
 */
export type AFCO = AuxiliaryFunctionConfigurationObject;