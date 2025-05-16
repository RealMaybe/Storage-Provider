import { defineConfig } from "vite"; // vite 配置文件
import path from "path";

import terser from "@rollup/plugin-terser"; // 压缩插件
import {
    libVersion, // 版本号
    WriteCopyrightPlugin, // 引入版权信息写入插件
    libCopyrightBanner, // 版权信息
    libPluginOptions, // 库打包插件选项
    pluginPluginOptions, // 插件打包插件选项
} from "./copyright";


/* ========== */


/* 库打包选项 */

const libName = "StorageProvider"; // 库的名称
const pluginName = "StorageProviderPlugin"; // 插件的名称

const libOutputIIFE = {
    input: {
        [libName]: "./src/lib/index.ts", // IIFE 格式模块的入口文件
    },
    output: {
        dir: `dist/${libName}/iife`, // IIFE 格式模块的输出目录
        format: "iife",
        name: libName,
        entryFileNames: `[name].iife.${libVersion}.js`,
        plugins: libPluginOptions
    }
} as any;

const libOutputES = {
    input: {
        [libName]: "./src/lib/main.ts", // ES 格式模块的入口文件
    },
    output: {
        dir: `dist/${libName}/es`, // ES 格式模块的输出目录
        format: "es",
        name: libName,
        entryFileNames: `[name].es.${libVersion}.js`,
        plugins: libPluginOptions
    }
} as any;


/* ========== */


/* 插件打包配置 */


/* ========== */

/* 输出配置 */
export default defineConfig({
    /* 别名配置 */
    resolve: {
        alias: {
            "@types": path.resolve(__dirname, "src/@types"),
        },
    },
    /* 服务器配置 */
    server: {
        port: 2427, // 设置服务器端口号
        open: true, // 启动时自动打开浏览器
        host: "0.0.0.0", // 允许外部访问
    },
    /* 打包配置 */
    build: {
        lib: {
            entry: "./src/lib/index.ts",
            name: libName,
            fileName: (format, entryName) => `${entryName}.${format}.${libVersion}.js`,
        },
        rollupOptions: {
            ...libOutputIIFE,
            // ...libOutputES,
        },
    },
});