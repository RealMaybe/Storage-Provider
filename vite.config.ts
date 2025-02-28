import { defineConfig } from "vite";
import { terser } from "rollup-plugin-terser";
import { version, writeCopyrightPlugin } from "./outputConfig";

/*  */
export default defineConfig({
    build: {
        lib: {
            entry: "./lib/index.ts",
            name: "StorageProvider",
            formats: ["es", "umd", "iife"],
            fileName: (format) => `storage-provider.${format}.${version}.js`,
        },
        rollupOptions: {
            output: [{
                dir: "dist/es", // ES 模块格式的输出目录
                format: "es",
                entryFileNames: `storage-provider.es.${version}.js`,
                globals: {},
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
            }, {
                dir: "dist/umd", // UMD 格式模块的输出目录
                format: "umd",
                name: "StorageProvider",
                entryFileNames: `storage-provider.umd.${version}.js`,
                globals: {},
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
            }, {
                dir: "dist/iife", // IIFE 格式模块的输出目录
                format: "iife",
                name: "StorageProvider",
                entryFileNames: `storage-provider.iife.${version}.js`,
                globals: {},
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
            }],
        }
    },
});