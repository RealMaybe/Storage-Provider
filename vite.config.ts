import { defineConfig } from "vite";
import terser from "@rollup/plugin-terser";

import {
    version, // 版本号
    writeCopyrightPlugin, // 引入版权信息写入插件
} from "./outputConfig";

/* 打包选项 */
const name = "StorageProvider"; // 库的名称
const pluginOptions = [ // 打包插件选项
    terser({
        compress: {
            drop_console: false, // console 日志
            drop_debugger: true // debugger 语句
        },
        mangle: true, // 变量名
        output: {
            comments: false, // 移除注释
        }
    }),
    writeCopyrightPlugin(), // 写入版权信息
];

/* 打包配置 */
export default defineConfig({
    build: {
        lib: {
            entry: "./lib/index.ts",
            name,
            // formats: ["es", "umd", "iife"],
            fileName: (format) => `${name}.${format}.${version}.js`,
        },
        rollupOptions: {
            output: [{
                dir: "dist/es", // ES 模块格式的输出目录
                format: "es",
                entryFileNames: `${name}.es.${version}.js`,
                globals: {},
                plugins: pluginOptions,
            }, {
                dir: "dist/umd", // UMD 格式模块的输出目录
                format: "umd",
                name,
                entryFileNames: `${name}.umd.${version}.js`,
                globals: {},
                plugins: pluginOptions,
            }, {
                dir: "dist/iife", // IIFE 格式模块的输出目录
                format: "iife",
                name,
                entryFileNames: `${name}.iife.${version}.js`,
                globals: {},
                plugins: pluginOptions,
            }],
        }
    },
});