// 版本号
const version = "1.1.1";

// 版权信息插件
const copyrightPlugin = () => ({
    name: "copyright-plugin",
    banner: () => [
        "/*",
        "* @copyright",
        `* StorageProvider.js v${version}`,
        "* Copyright (c) 2024-present RealMaybe",
        "* All rights reserved.",
        "* Licensed under the MIT License.",
        "* Open source address:",
        "* - https://gitee.com/RealMaybe0429/storage-provider",
        "* - https://github.com/RealMaybe/Storage-Provider",
        "* Documentation address:",
        "* - https://www.yuque.com/realmaybe0429/storage-provider",
        "*/"
    ].join("\n"),
});

// 导出配置
const format = "iife";

// rollup 配置
export default {
    input: "src/index.js",
    output: {
        file: `dist/StorageProvider.${version}.${format}.js`,
        format,
        name: "StorageProvider",
        plugins: [
            copyrightPlugin()
        ],
    },
};