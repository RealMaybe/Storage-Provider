// 导入依赖
import {
    type TypeUserConfig,
    type TypeClassConfig,
    type TypeClassConfigDefaultValues
 } from "./type/typeClassConfig"; // 导入类配置类型
import { localStorage } from "./var/local"; // localStorage 存储器
import { sessionStorage } from "./var/session"; // sessionStorage 存储器
import { Settings } from "./settings/Settings"; // 配置管理器
import { CheckCircular } from "./checker/checkCircular" // 循环引用检查器
import { ValidateObject } from "./validate/ValidateObject"; // 验证对象的方法
import { ValidateArray } from "./validate/ValidateArray"; // 验证数组的方法
import { ValidateKey } from "./parameter/ValidateKey"; // 验证键名的方法 
import { ValidateValue } from "./parameter/ValidateValue"; // 验证值的方法
import { m_listener } from "./methods/listener" // 监听器
import { m_inspector } from "./methods/inspector" // 验证规则的方法
import { m_store } from "./methods/store" // 存储、获取值的方法
import { m_setManyFromKeyValue } from "./methods/setManyFromKeyValue" // 通过数组中的对象中的 key 和 value 属性批量设置值的方法
import { m_setManyFromObject } from "./methods/setManyFromObject"; // 通过对象批量设置值的方法
import { m_setValueMethod } from "./methods/setValueMethod"; // 设置单条或多条存储数据
import { m_getMany } from "./methods/getMany" // 获取多条存储数据的方法
import { m_getAll } from "./methods/getAll" // 获取所有存储数据的方法
import { m_deleteItem } from "./methods/delete" // 删除单条或多条存储数据的方法

export class StorageProvider {
    #config: TypeClassConfig;

    constructor(settings: TypeUserConfig) {
        // 解构、验证配置参数
        const {
            storageType,
            warn,
            circular,
            monitor,
            channelName,
        } = Settings(settings) as unknown as TypeClassConfigDefaultValues;

        /* ========== */

        // 建立配置对象

        this.#config = {
            storage: (() => { // 存储环境
                // 浏览器环境
                if (window && globalThis === window)
                    return storageType === "session" ? sessionStorage : localStorage;

                // 其他环境
                else throw new Error("Unknown environment, unable to determine storage method.");
            })(),
            type: storageType, // 存储类型
            warn, // 是否弹出警告信息
            circular, // 是否去除循环引用
            monitor, // 是否监控存储变化
            channel: monitor && typeof BroadcastChannel !== "undefined" ? new BroadcastChannel(channelName) : null, // 频道
        }
    }
}