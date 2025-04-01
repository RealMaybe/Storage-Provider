// 版权信息
export const WriteCopyrightPlugin = (
    copyright: () => string
) => ({
    name: "write-copyright-plugin",
    generateBundle(_: any, bundle: any) {
        for (const fileName in bundle) {
            if (bundle[fileName].type === "chunk") {
                bundle[fileName].code = copyright() + "\n" + bundle[fileName].code;
            }
        }
    }
});