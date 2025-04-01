import terser from "@rollup/plugin-terser"; // 压缩插件
import { WriteCopyrightPlugin } from "./write-copyright-plugin";
import { libCopyrightBanner, pluginCopyrightBanner } from "./copyright";


/* ========== */


/* 插件选项 */

export const libPluginOptions = [ // 库打包插件选项
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
    WriteCopyrightPlugin(libCopyrightBanner), // 写入版权信息
];


export const pluginPluginOptions = [ // 插件打包插件选项
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
    WriteCopyrightPlugin(pluginCopyrightBanner), // 写入版权信息
]
