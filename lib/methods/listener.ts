/* 监听器 */


import { type RealClassConfigType } from "../tsType/classConfigType";
import { isFunction, isInvalid, isBoolean } from "../type/checkType";
import { StorageProvider } from "../Storage";


/* ========== */


type messageObject = {
    message: any,
    callback?: never
};

type callbackObject = {
    message?: never,
    callback: (message: any) => any
};

type listenerObject = messageObject | callbackObject;


/* ========== */


/**
 * 辅助监听函数
 * @param { RealClassConfigType<true> } classConfig 类配置
 * @param { listenerObject } msgObj 消息对象
 * @returns { void } 无返回值
 */
export function m_listener(
    classConfig: RealClassConfigType<boolean>,
    msgObj: messageObject
): void;

/**
 * 辅助监听函数
 * @param { RealClassConfigType<true> } classConfig 类配置
 * @param { listenerObject } msgObj 消息对象
 * @param { StorageProvider } provider
 * @returns { (close?: boolean) => void } 清理函数
 */
export function m_listener(
    classConfig: RealClassConfigType<boolean>,
    msgObj: callbackObject,
    provider: StorageProvider
): (close?: boolean) => void;


/* ========== */


export function m_listener(
    classConfig: RealClassConfigType<boolean>,
    msgObj: listenerObject,
    provider?: StorageProvider
): void | ((close: boolean) => void) {
    const { monitor, channel } = classConfig;
    const { message, callback } = msgObj;

    /* ========== */

    // 检查监听器是否开启
    if (!monitor) throw new TypeError("The monitor is not enabled, please modify in the configuration object of the constructor.");

    // 检查 channel 是否存在
    else if (monitor && channel) {
        // 检查 message 和 callback 是否同时存在
        if (msgObj.hasOwnProperty("message") &&
            msgObj.hasOwnProperty("callback")
        ) throw new TypeError("Both message and callback cannot exist simultaneously.");

        // 检查 message 和 callback 是否同时不存在
        if (!msgObj.hasOwnProperty("message") &&
            !msgObj.hasOwnProperty("callback")
        ) throw new TypeError("There must be at least one of message or callback.");

        /* ========== */

        // message 存在，发送消息
        if (msgObj.hasOwnProperty("message")) {
            if (isInvalid(message) &&
                classConfig.warn
            ) console.warn("Warning: The message may be an invalid value or the message object may contain invalid values. To send invalid values, please use the 'sendMsg' method.");

            channel.postMessage(message);
        }

        // callback 存在
        else if (msgObj.hasOwnProperty("callback")) {
            if (isFunction(callback as Function)) {
                // 监听消息
                let callbackFun = (event: { [key: string]: any }): void => { (callback as Function).call(provider, event.data) };

                // 监听消息事件
                channel.addEventListener("message", callbackFun)

                // 返回清理函数
                return (close: boolean = false) => { isBoolean(close) && close ? channel.close() : channel.removeEventListener("message", callbackFun) }
            } else throw new TypeError("The callback must be a function.");
        }
    }
};