/* 监听器 */

/**
 * 辅助监听函数
 * @param { { monitor: boolean, channel: BroadcastChannel } } classConfig 类配置
 * @param { { message?: any, callback?: (message: any) => any, provider: StorageProvider } } msgObj 消息对象
 * @returns { (close: boolean = false) => void } 清理函数
 */
export function m_listener(classConfig, msgObj, provider) {
    const { monitor, channel } = classConfig;
    const { message, callback } = msgObj;

    /* ========== */

    // 检查监听器是否开启
    if (!monitor) throw new Error("The monitor is not enabled, please modify in the configuration object of the constructor.");
    else if (monitor && channel) {
        // 检查 message 和 callback 是否同时存在
        if (msgObj.hasOwnProperty("message") &&
            msgObj.hasOwnProperty("callback")
        ) throw new Error("Both message and callback cannot exist simultaneously");

        // 检查 message 和 callback 是否同时不存在
        if (!msgObj.hasOwnProperty("message") &&
            !msgObj.hasOwnProperty("callback")
        ) throw new Error("There must be at least one of message or callback");

        /* ========== */

        // message 存在，发送消息
        if (msgObj.hasOwnProperty("message"))
            channel.postMessage(message);

        // callback 存在
        else if (msgObj.hasOwnProperty("callback") &&
            typeof callback === "function"
        ) {
            // 监听消息
            let callbackFun = event => { callback.call(provider, event.data) };

            // 监听消息事件
            channel.addEventListener("message", callbackFun)

            // 返回清理函数
            return (close = false) => { close ? channel.close() : channel.removeEventListener("message", callbackFun) }
        }
    }
};