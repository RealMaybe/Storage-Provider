/** 
 * @class StorageListener
 * @classdesc 监听器，用于监听存储变化
 */
export class StorageListener {
    constructor() {
        // 使用箭头函数确保this指向正确
        window.addEventListener(
            "storage",
            event => this.change(event)
        );
    }

    /**
     * 监听器的操作方法
     * @method operate
     * 
     * @param { Function } callback 
     */
    operate(callback) {
        callback(this.change());
    }

    /**
     * 监听存储变化
     * @method change
     * 
     * @param { Storage } event 事件对象
     * 
     * @returns { { key: string, newValue: any, oldValue: any, url: string, storageArea: Storage } } 事件对象
     */
    change(event) {
        const { key, newValue, oldValue, url, storageArea } = event;

        return { key, newValue, oldValue, url, storageArea }
    }

    /**
     * 销毁监听器
     * @method destroy
     * 
     * @returns { void }
     */
    destroy() {
        window.removeEventListener(
            "storage",
            (event) => this.change(event)
        )
    }
}