// 导入依赖
import { terser } from "rollup-plugin-terser";

/* ========== */

const version = "1.1.2"; // 版本号
const format = "iife"; // 导出格式

// 版权信息
const writeCopyrightPlugin = () => ({
    name: "write-copyright-plugin",
    generateBundle(_, bundle) {
        const copyrightBanner = () => [
            "/**",
            " * @copyright",
            ` * StorageProvider.js ${version}`,
            " * Copyright (c) 2024-present RealMaybe",
            " * All rights reserved.",
            " * Licensed under the MIT License.",
            " * Open source address:",
            " * - https://gitee.com/RealMaybe0429/storage-provider",
            " * - https://github.com/RealMaybe/Storage-Provider",
            " * Documentation address:",
            " * - https://www.yuque.com/realmaybe0429/storage-provider",
            " */"
        ].join("\n");

        for (const fileName in bundle) {
            if (bundle[fileName].type === "chunk")
                bundle[fileName].code = copyrightBanner() + "\n" + bundle[fileName].code;
        }
    }
});

// rollup 配置
export default {
    input: "src/index.js",
    output: {
        // file: `dist/StorageProvider.${version}.${format}.js`,
        file: `dist/StorageProvider.js`,
        format,
        name: "StorageProvider",
        plugins: [
            terser({
                compress: {
                    drop_console: false, // 不移除 console 日志
                    drop_debugger: true // 移除 debugger 语句
                },
                mangle: true, // 混淆变量名
                output: {
                    comments: false, // 移除注释
                }
            }),
            writeCopyrightPlugin(), // 写入版权信息
        ],
    },
    watch: {
        include: "src/**",
        exclude: "node_modules/**"
    }
};