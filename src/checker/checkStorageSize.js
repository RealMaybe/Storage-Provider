/* 检查 webStorage 中所有数据的总大小 */

/**
 * 计算 webStorage 中所有数据的总大小
 *
 * @function CheckStorageSize
 * 
 * @param { object } config 配置对象
 * @returns { object } 包含字节（b）、千字节（kb）和兆字节（mb）的对象
 */
export function CheckStorageSize(config) {
    let totalSize = Object.keys(config.storage)
        .reduce((acc, key) => acc + (key.length +
            JSON.stringify(config.storage[key]).length) * 2, 0);

    return (sizeInBytes => ({
        b: parseFloat(sizeInBytes.toFixed(2)),
        kb: parseFloat((sizeInBytes / 1024).toFixed(2)),
        mb: parseFloat((sizeInBytes / 1024 / 1024).toFixed(2)),
    }))(totalSize)
}