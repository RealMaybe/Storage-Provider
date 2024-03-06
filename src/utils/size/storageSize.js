/**
 * 计算 webStorage 中所有数据的总大小
 *
 * @param { Storage } storage 本地存储对象，可以是 localStorage, sessionStorage 等
 * @returns { Object } 包含字节（b）、千字节（kb）和兆字节（mb）的对象
 */
export function getStorageSize(storage) {
    let totalSize = Object.keys(storage).reduce((acc, key) => acc + (key.length + JSON.stringify(storage[key]).length) * 2, 0);

    return (sizeInBytes => ({
        b: parseFloat(sizeInBytes.toFixed(2)),
        kb: parseFloat((sizeInBytes / 1024).toFixed(2)),
        mb: parseFloat((sizeInBytes / 1024 / 1024).toFixed(2)),
    }))(totalSize)
}