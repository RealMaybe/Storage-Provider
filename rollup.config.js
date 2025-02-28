// 导入依赖
import { terser } from "rollup-plugin-terser";
// import typescript from "@rollup/plugin-typescript";
// import commonjs from "@rollup/plugin-commonjs";
// import resolve from "@rollup/plugin-node-resolve";
// import ts from "rollup-plugin-ts";

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
            ` * StorageProvider.js v${version}`,
            " * Copyright (c) 2024-present RealMaybe",
            " * - All rights reserved.",
            " * - Licensed under the MIT License.",
            " * @author RealMaybe <realmaybe0429@qq.com>",
            // " * - Open source address:",
            " * @link Gitee: https://gitee.com/RealMaybe0429/storage-provider",
            " * @link GitHub: https://github.com/RealMaybe/Storage-Provider",
            " * - Documentation address:",
            " * @link https://www.yuque.com/realmaybe0429/storage-provider",
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
    input: "refactoring/index.js",
    output: {
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
    // plugins: [
    //     resolve({
    //         extensions: [".js", ".ts"],
    //     }),
    //     commonjs(),
    //     typescript({
    //         tsconfig: "./tsconfig.json",
    //     }),
    //     ts(), // 使用 ts 插件
    // ],
    watch: {
        include: "src/**",
        exclude: "node_modules/**"
    }
};