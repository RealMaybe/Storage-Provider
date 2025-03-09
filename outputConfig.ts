// 版本号
export const version = "1.1.2";

// 版权信息
export const writeCopyrightPlugin = () => ({
    name: "write-copyright-plugin",
    generateBundle(_, bundle: any) {
        const copyrightBanner = () => [
            "/**",
            " * @copyright",
            ` * StorageProvider.js v${version}`,
            " * Copyright (c) 2024-present RealMaybe",
            " * - All rights reserved.",
            " * - Licensed under the MIT License.",
            " * @author RealMaybe <realmaybe0429@qq.com>",
            " * @license https://opensource.org/licenses/MIT",
            " * - Open source address:",
            " * @see https://gitee.com/RealMaybe0429/storage-provider",
            " * @see https://github.com/RealMaybe/Storage-Provider",
            " * - Documentation address:",
            " * @see https://www.yuque.com/realmaybe0429/storage-provider",
            " */"
        ].join("\n");

        for (const fileName in bundle) {
            if (bundle[fileName].type === "chunk") {
                bundle[fileName].code = copyrightBanner() + "\n" + bundle[fileName].code;
            }
        }
    }
});