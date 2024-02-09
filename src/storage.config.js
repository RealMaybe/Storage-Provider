export const config = {
    storageType: "local", // 存储类型
    maxSize: 5242880, // 指定存储的最大大小为 5 MB（ 5242880 字节）。
    expiration: 86400000, // 指定存储的过期时间为 24 小时（ 86400000 毫秒）。
    prefix: "myApp_", // prefix： 为存储的键添加了前缀“ myApp_”， 以区分不同的存储实例。
    compression: true, // 数据压缩。
    encryption: false, // encryption： 禁用了数据加密。
    backup: true // backup： 启用了数据备份。
}