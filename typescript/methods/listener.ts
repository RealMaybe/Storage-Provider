/* 监听器 */

// 导入依赖
import { type TypeClassConfig } from "../type/typeClassConfig";

/* ========== */


/* ========== */

/**
 * 辅助监听函数
 * @param { TypeClassConfig } classConfig 类配置
 * @param { { message?: any, callback?: (message: any) => any } } msgObj 消息对象
 */
export function m_listener(
    classConfig: TypeClassConfig,
    msgObj: {
        message: any,
        callback?: (message: any) => any
    } | {
        message?: any,
        callback: (message: any) => any
    }
) {
    const { monitor, channel } = classConfig;
    const { message, callback } = msgObj;

    /* ========== */

    // 检查监听器是否开启
    if (!monitor) throw new Error("The monitor is not enabled, please modify in the configuration object of the constructor.");
    else if (monitor && channel) { // 监听器开启且 channel 存在
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
            let callbackFun = (event) => { callback(event.data) };

            // 监听消息事件
            channel.addEventListener("message", callbackFun)

            // 返回清理函数
            return () => {
                channel.removeEventListener("message", callbackFun);
            }
        }
    }
}