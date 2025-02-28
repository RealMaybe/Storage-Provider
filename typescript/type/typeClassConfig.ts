// 类型映射
export type TypeMap = {
    string: string;
    number: number;
    boolean: boolean;
};

// 根据 type 字符串字面量提取对应的类型
export type TypeFromMapping<T extends keyof TypeMap> = TypeMap[T];

// 配置项接口
export interface ConfigItem<T extends keyof TypeMap> {
    type: T; // 配置项的类型，限制为 TypeMap 的键（字面量类型）
    required: boolean; // 是否为必填项
    validator: (value: any) => boolean; // 验证函数，参数类型根据 type 确定
    errorMessage: string; // 验证失败时的错误信息
    defaultValue: TypeFromMapping<T>; // 默认值，类型必须与 type 一致
}

// 定义具体的类型和默认值
type StorageTypeConfig = ConfigItem<"string">;
type WarnConfig = ConfigItem<"boolean">;
type CircularConfig = ConfigItem<"boolean">;
type MaxSizeConfig = ConfigItem<"number">;
type MonitorConfig = ConfigItem<"boolean">;
type ChannelNameConfig = ConfigItem<"string">;
type PrefixConfig = ConfigItem<"string">;

// 默认配置选项表
export type TypeClassConfigDefaultValidator = {
    storageType: StorageTypeConfig,
    warn: WarnConfig,
    circular: CircularConfig,
    maxSize: MaxSizeConfig,
    monitor: MonitorConfig,
    channelName: ChannelNameConfig,
    prefix: PrefixConfig,
};

// 获取 TypeClassConfigDefaultValidator 中属性的类型
type TypeClassConfigDefaultKeys = keyof TypeClassConfigDefaultValidator;

// 获取 TypeClassConfigDefaultValidator 中属性值的类型
export type TypeClassConfigDefaultValueTypes = {
    [K in TypeClassConfigDefaultKeys]: TypeClassConfigDefaultValidator[K] extends ConfigItem<infer T> ? T : never;
};

export type TypeClassConfigDefaultValues = {
    [K in TypeClassConfigDefaultKeys]: TypeClassConfigDefaultValidator[K] extends ConfigItem<infer T> ? TypeFromMapping<T> : never;
}

// 用户传入的配置项
export type TypeUserConfigString = "local" | "session";
export type TypeUserConfigObject = ({
    storageType: string;
    type?: string;
} | {
    type: string;
    storageType?: string;
}) & {
    warn: boolean;
    circular?: boolean;
    maxSize?: number;
    monitor?: boolean;
    channelName?: string;
    prefix?: string;
};
export type TypeUserConfig = TypeUserConfigObject | TypeUserConfigString;

// 检查后的类配置
export type TypeClassConfig = {
    storage: Storage,
    type: TypeClassConfigDefaultValidator["storageType"]["type"],
    warn: TypeClassConfigDefaultValidator["warn"]["type"],
    circular: TypeClassConfigDefaultValidator["circular"]["type"],
    monitor: TypeClassConfigDefaultValidator["monitor"]["type"],
    channel: BroadcastChannel | null,
};