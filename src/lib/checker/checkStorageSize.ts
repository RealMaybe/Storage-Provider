/* 检查 webStorage 中数据的总大小 */


import { type RealClassConfigType } from "../../scriptType/classConfigType";
import { objKeys } from "../../assistant/objKeys";
import { localStorage } from "../var/local";
import { sessionStorage } from "../var/session";


/* ========== */


/**
 * 计算 webStorage 中数据的总大小
 * - 包含 localStorage、sessionStorage，不含 cookie
 * - 通过遍历所有 key 计算总大小，并返回字节、千字节、兆字节的对象
 *
 * @function CheckStorageSize
 * @param { RealClassConfigType<boolean> } _classConfig 配置对象
 * @returns { CheckStorageSizeResult } 包含字节（bytes）、千字节（kb）和兆字节（mb）的对象
 */
export function CheckStorageSize(
    _classConfig: RealClassConfigType<boolean>
): {
    bytes: number | string,
    kb: number | string,
    mb: number | string
} {
    let localSize: number = 0; // 初始化本地存储空间大小计数器
    let sessionSize: number = 0; // 初始化会话存储空间大小计数器

    // 遍历 localStorage 中的所有键值对
    for (const key of objKeys(localStorage)) {
        const value = localStorage.getItem(key);
        const itemSize = key.length + (value ? JSON.stringify(value).length : 0);
        localSize += itemSize * 2; // 计算每个项的大小（key 和 value 的长度之和），并乘以 2 以考虑字符编码
    }

    // 遍历 sessionStorage 中的所有键值对
    for (const key of objKeys(sessionStorage)) {
        const value = sessionStorage.getItem(key);
        const itemSize = key.length + (value ? JSON.stringify(value).length : 0);
        sessionSize += itemSize * 2; // 计算每个项的大小（key 和 value 的长度之和），并乘以 2 以考虑字符编码
    }

    // 计算总的存储空间大小
    const totalSize: number = localSize + sessionSize;

    // 返回格式化的结果对象
    return {
        bytes: totalSize,
        kb: (totalSize / 1024).toFixed(2),
        mb: (totalSize / (1024 * 1024)).toFixed(2)
    };
}