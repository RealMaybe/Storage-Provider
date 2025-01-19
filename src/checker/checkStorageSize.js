/* 检查 webStorage 中数据的总大小 */

/**
 * 计算 webStorage 中数据的总大小
 * - 包含 localStorage、sessionStorage，不含 cookie
 * - 通过遍历所有 key 计算总大小，并返回字节、千字节、兆字节的对象
 *
 * @function CheckStorageSize
 * @returns { { bytes: number | string, kb: number | string, mb: number | string } } 包含字节（bytes）、千字节（kb）和兆字节（mb）的对象
 */
export function CheckStorageSize() {
    // 计算localStorage的总大小
    const localSize = Object.keys(localStorage)
        .reduce((acc, key) => {
            const value = localStorage.getItem(key);
            const itemSize = key.length + (value ? JSON.stringify(value).length : 0);
            return acc + itemSize * 2;
        }, 0);

    // 计算sessionStorage的总大小
    const sessionSize = Object.keys(sessionStorage)
        .reduce((acc, key) => {
            const value = sessionStorage.getItem(key);
            const itemSize = key.length + (value ? JSON.stringify(value).length : 0);
            return acc + itemSize * 2;
        }, 0);

    // 计算总大小并格式化输出
    const totalSize = localSize + sessionSize;
    return {
        bytes: totalSize,
        kb: (totalSize / 1024).toFixed(2),
        mb: (totalSize / (1024 * 1024)).toFixed(2)
    };
}