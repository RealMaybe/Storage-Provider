/**
 * StorageProvider Plugin
 * @version 0.1.1
 * @author RealMaybe
 * @license MIT
 * @see https://github.com/RealMaybe/StorageProvider
 * 
 * @param { StorageProvider } $ StorageProvider
 * @param { { instantiate: boolean, classOptions: "local" | "session" { [key: string]: string | number | boolean } } } [T] Settings for the plugin
 * @returns { StorageProvider }
 */
export default function ObsoleteStorage($,T){class S extends ${constructor(...a){super(...a)}Storage(k,v){return this.storage(k,v)}Save(k,v){return this.save(k,v)}SaveMany(v){return this.saveMany(v)}SetMany(v){return this.setMany(v)}Set(...r){return this.set(...r)}Get(k){return this.get(k)}GetMany(v,e){return this.getMany(v,e)}GetAll(){return this.getAll()}Delete(e=null){this.delete(e)}Remove(k){this.remove(k)}RemoveMany(e){this.removeMany(e)}Clean(){this.clean()}}const{i=!1,c={}}=T||{};return i?new S(c):S}