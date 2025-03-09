/**
 * StorageProvider Plugin
 * @version 0.1.1
 * @author RealMaybe
 * @license MIT
 * @see https://github.com/RealMaybe/StorageProvider
 * 
 * @function ObsoleteStorage
 * @param { StorageProvider } $SP StorageProvider
 * @param { { instantiate: boolean, classOptions: "local" | "session" | { [key: string]: string | number | boolean } } } [settings] Settings for the plugin
 * @returns { StorageProvider }
 */
export default function ObsoleteStorage($SP, settings) {
    class ob extends $SP {
        constructor(...options) { super(...options) }
        Storage(key, value) { return this.storage(key, value) }
        Save(key, value) { return this.save(key, value) }
        SaveMany(values) { return this.saveMany(values) }
        SetMany(values) { return this.setMany(values) }
        Set(...content) { return this.set(...content) }
        Get(key) { return this.get(key) }
        GetMany(values, type) { return this.getMany(values, type) }
        GetAll() { return this.getAll() }
        Delete(key = null) { this.delete(key) }
        Remove(key) { this.remove(key) }
        RemoveMany(keys) { this.removeMany(keys) }
        Clean() { this.clean() }
    };

    const { instantiate = false, classOptions = "local" } = settings || {};

    return instantiate ? new ob(classOptions) : ob;
}