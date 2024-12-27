---

# 基本说明
:::info
+ 说明文档请见 [Storage Provider 说明文档](https://www.yuque.com/realmaybe0429/storage-provider/documentation)
+ 更新日志请见 [Storage Provider 更新日志](https://www.yuque.com/realmaybe0429/storage-provider/change-log)
+ 源代码作者：**RealMaybe**
+ 本文档基于 **StorageProvider 1.1.1 **版本。
+ 当前所用版本高于文档版本，且文档没有更改版本号，即代表本文档可以正常使用。
+ 不同的版本所对应的文档可能存在不一致。
+ 为保证数据、说明等的完善性，本文档可能更新较为频繁。

:::

---

### 近乎所有的方法都会出现的抛出异常缘由
:::tips
<font style="color:rgb(38,38,38);">为保证参数、数据有效性，Storage Provider 类中对参数</font>`<font style="color:rgb(38,38,38);">key</font>`<font style="color:rgb(38,38,38);">、</font>`<font style="color:rgb(38,38,38);">value</font>`<font style="color:rgb(38,38,38);">、</font>`<font style="color:rgb(38,38,38);">arr</font>`<font style="color:rgb(38,38,38);">、</font>`<font style="color:rgb(38,38,38);">obj</font>`<font style="color:rgb(38,38,38);">等均做了类型、有效性验证等。</font>

<font style="color:rgb(38,38,38);">因此，所有⽅法的说明内容中，将不再写明下列报错。</font>

具体的错误原因请在使用方法时查看控制台报错。

**key** :

+ `key` 不为 `string` 类型
+ `key` 为空字符串

:::

:::tips
**arr** :

+ 输入参数不为数组
+ 数组内部无有效数据
+ 验证项为 `string` 
    - 数组内部数据存在非字符串
+ 验证项为 `object` 
    - 数组中的元素不是对象
    - 对象中不包含 `key` 和 `value` 属性

:::

---

---

# 辅助方法
## 1. `circular`
### 作用
去除非 null 对象/数组中的循环引用内容

### 参数
| 参数 | 必选 | 类型 | 说明 |
| --- | --- | --- | --- |
| item | ture | object | Array<any> | 要去除循环引用的对象或数组 |


### 返回值
| 类型 | 说明 |
| --- | --- |
| object | Array<any> | 已经去除循环引用的对象或数组 |


---

## 2. `inspector`
### 作用
验证本地存储中指定的项是否满足制定的规则的方法

### 参数
| 参数 | 必选 | 类型 | 说明 |
| --- | --- | --- | --- |
| obj | ture | { [storageKey: string]: string | (item: any) => boolean } | 指定的项及其验证规则，详细规则见下 |


+ 该对象中的每一个属性的键名将作为存储的键名，属性值将作为验证规则；
+ 验证规则可以是字符串，也可以是一个函数，该函数的返回值必须为布尔值；
+ 如果是字符串，则检测 Storage 中 storageKey 对应的值的类型是否与该字符串相等；
+ 如果是函数，则调用该函数，传入 Storage 中 storageKey 对应的值，如果函数返回 true，则验证通过，否则验证失败。

### 返回值
| 类型 | 说明 |
| --- | --- |
| {<br/>all: boolean,<br/>tips: {  [storageKey: string]: string }, <br/>errors: {  [storageKey: string]: string }<br/>} | 验证结果对象<br/>+ all: 所有的项目验证是否通过，全部通过为 true，任一不通过为 false；<br/>+ tips: 验证提示信息；<br/>+ errors: 验证失败的项目及其对应的错误信息。 |


---

# 监听方法
监听类的方法是基于 Web BroadcastChannel API 的相关方法来进行的二次封装。

BroadcastChannel 是<font style="color:rgb(44, 44, 54);">一种允许同一源（origin）下的不同浏览上下文（如不同的窗口、标签页或 iframe）之间进行简单、高效的通信的机制。</font>

<font style="color:rgb(44, 44, 54);">关于 BroadcastChannel 的相关用法，请参阅文档：</font>[<u><font style="color:#117CEE;">BroadcastChannel</font></u>](https://developer.mozilla.org/en-US/docs/Web/API/BroadcastChannel)

:::danger
在使用该类方法的时候，配置对象中的`monitor`属性必须设置为`true`，否则将无法使用相关的方法。

:::

## 1. `sendMsg`
### 作用
<font style="color:rgb(44, 44, 54);">发送消息给其他的页面</font>

<font style="color:rgb(44, 44, 54);">可以发送任意可以被克隆的值，包括</font>`<font style="color:rgb(44, 44, 54);">null</font>`<font style="color:rgb(44, 44, 54);">、</font>`<font style="color:rgb(44, 44, 54);">undefined</font>`<font style="color:rgb(44, 44, 54);">等</font>

### <font style="color:rgb(44, 44, 54);">参数</font>
| 参数 | 必选 | 类型 | 说明 |
| --- | --- | --- | --- |
| data | false | any | 需要发送的消息 |


### 返回值
无

---

## 2. `postMsg`
### 作用
<font style="color:rgb(44, 44, 54);">发送消息给其他的页面</font>

<font style="color:rgb(44, 44, 54);">用法与</font>`<font style="color:rgb(44, 44, 54);">sendMsg</font>`<font style="color:rgb(44, 44, 54);">一致，但是使用该方法传输的值必须为有效值</font>

### <font style="color:rgb(44, 44, 54);">参数</font>
| 参数 | 必选 | 类型 | 说明 |
| --- | --- | --- | --- |
| data | true | any | 需要发送的消息 |


### 返回值
无

---

## 3. `listenMsg`
### 作用
用于接收 `sendMsg`、`postMsg`发送的消息

### <font style="color:rgb(44, 44, 54);">参数</font>
| 参数 | 必选 | 类型 | 说明 |
| --- | --- | --- | --- |
| callback | ture | (message: any) => void | 回调函数<br/>内部可以使用 this 来调用 StorageProvider 的其他任意方法 |


### 返回值
| 类型 | 说明 |
| --- | --- |
| (close: boolean = false) => void | 清理函数，默认参数值为 false<br/>+ 当 close 为`true`时，完全关闭监听器。<br/>+ 当 close 为`false`或未提供时，关闭后续的监听。 |


---

---

# 存储及获取内容的方法
## `storage`
### 作用
设置或获取单条存储数据

### 参数
| 参数 | 必选 | 类型 | 说明 |
| --- | --- | --- | --- |
| key | ture | string | 数据的键名 |
| value | false | any | 要存储的值 |


### 返回值
| 类型 | 说明 |
| --- | --- |
| void | 如果 value 有效，则存储值，无返回值 |
| any | 如果 value 无效，则返回存储的值 |


---

---

# 存储内容的方法
## 1. `save`
### 作用
设置单条存储数据

### 参数
| 参数 | 必选 | 类型 | 说明 |
| --- | --- | --- | --- |
| key | ture | string | 数据的键名 |
| value | ture | any | 要存储的值 |


### 返回值
无

### 抛出异常缘由
+ value 无效

---

## 2. `saveMany`
### 作用
通过数组中的对象中的 key 和 value 属性批量设置多条存储数据

### 参数
| <font style="color:#262626;">参数</font> | <font style="color:#262626;">必选</font> | <font style="color:#262626;">类型</font> | <font style="color:#262626;">说明</font> |
| --- | --- | --- | --- |
| arr | ture | Array<{key: string, value: any}> | 要存储的多条数据。<br/>数组中的每个元素都必须是包含`key`和`value`属性的对象 |


### 返回值
无

---

## 3. `setMany`
### 作用
通过对象批量设置多条存储数据

### 参数
| <font style="color:#262626;">参数</font> | <font style="color:#262626;">必选</font> | <font style="color:#262626;">类型</font> | <font style="color:#262626;">说明</font> |
| --- | --- | --- | --- |
| obj | ture | { [key: string]: any } | 要存储的多条数据。<br/>对象中的每个属性的将作为key，属性值将作为存储的值。 |


### 返回值
无

## 4. `set`
### 作用
设置单条或多条存储数据

### 参数
| <font style="color:#262626;">参数</font> | <font style="color:#262626;">必选</font> | <font style="color:#262626;">类型</font> | <font style="color:#262626;">说明</font> |
| --- | --- | --- | --- |
| ...data | ture | Array<{ key: string, value: any }><br/><u>或</u> { [key: string]: any } <br/><u>或</u> 第一个参数为 string，第二个为 any | 要存储的单条或多条存储数据<br/>参数的传入原则与 save、saveMany、setMany 三个方法相同 |


+ 该函数传入参数数量为必须为 1 ~ 2；
+ 本方法本质上是对现有的 save、saveMany、setMany 的整合和封装；
+ 参数的传入原则与 save、saveMany、setMany 三个方法相同。

### 返回值
无

---

---

# 获取内容的方法
:::danger
所有的获取方法在获取内容的时候，如果传入的 `**key**` 在存储中没有找到有效数据，则返回 `**null**` 

:::

## 1. `get`
### 作用
获取单条存储数据

### 参数
| 参数 | 必选 | 类型 | 说明 |
| --- | --- | --- | --- |
| key | ture | string | 数据的键名 |


### 返回值
| 类型 | 说明 |
| --- | --- |
| any | 返回获取到的键名对应的值 |


---

## 2. `getMany`
### 作用
从存储中获取多个键对应的值

### 参数
| 参数 | 必选 | 类型 | 说明 |
| --- | --- | --- | --- |
| arr | ture | Array<string> | 包含需要获取值的键的数组 |
| type | false | string | 默认为"object"，具体用法详见返回值表 |


### 返回值
| 类型 | 说明 | 格式示例 |
| --- | --- | --- |
| { [key: string]: any } | 参数 type 为`"object"`时<br/>包含键值对的对象 | `{"key1":value1,"key2":value2, ...}` |
| Array<{ [key: string]: any }> | 参数 type 为`"array"`时<br/>包含键值对的对象数组 | `[{"key1":value1},{"key2":value2}, ...]` |
| Array<{"key": string, "value": any }> | 参数 type 为`"array-object"`时<br/>包含键值对的对象数组 | `[{"key":"key1","value":value1},{"key":"key2","value":value2}, ...]` |


### 关于参数 type 的具体说明
+ 如果 type 是 "array"，则将字符串数组中的每个元素作为键，对应的存储值作为值，构成一个对象数组，格式为 `[{ key1: value1 }, { key2: value2 }, ...]`。
+ 如果 type 是 "object"，则将字符串数组中的每个元素作为键，对应的存储值作为值，构成一个对象，格式为 `{ key1: value1, key2: value2, ... }`。
+ 如果 type 是 "array-object"，则将字符串数组中的每个元素作为键，并将键值对的格式放入一个对象数组中，格式为 `[{ key: "key1", value: value1 }, { key: "key2", value: value2 }, ...]`。

示例代码如下

```javascript
import StorageProvider from "StorageProvider.js";

const $local = new StorageProvider("local");

const result = $local.getMany(["key1", "key2", "key3"], "array");
// 上述返回值格式为
// [{ "key1": value1 }, { "key2": value2 }, { "key3": value3 }]

const result = $local.getMany(["key1", "key2", "key3"]);
const result = $local.getMany(["key1", "key2", "key3"], "object");
// 上述两种返回值一致，格式均为
// { "key1": value1, "key2": value2, "key3": value3 }

const result = $local.getMany(["key1", "key2", "key3"], "array-object");
// 上述返回值格式为
// [{ "key": "key1", value" value1 }, { "key": "key2", value" value2 }, { "key": "key3", value" value3 }]
```

---

## 3. `getAll`
### 作用
从存储中获取多个键对应的值

### 参数
无

### 返回值
| 类型 | 说明 | 格式示例 |
| --- | --- | --- |
| { [key: string]: any } | 包含所有本地存储数据的对象 | `{key1: value1, key2: value2, ...}` |


---

---

# 删除存储数据的方法
## 1、`delete`
### 作用
删除单条或所有存储数据

### 参数
| 参数 | 必选 | 类型 | 说明 |
| --- | --- | --- | --- |
| key | false | string | 要删除的数据的键名<br/>+ 传入参数，则删除单条<br/>+ 不传参数，则删除所有 |


### 返回值
无

---

## 2、`remove`
### 作用
删除单条存储数据

### 参数
| 参数 | 必选 | 类型 | 说明 |
| --- | --- | --- | --- |
| key | true | string | 要删除的数据的键名 |


### 返回值
无

---

## 3、`removeMany`
### 作用
删除多条存储数据

### 参数
| 参数 | 必选 | 类型 | 说明 |
| --- | --- | --- | --- |
| arr | true | Array<string> | 包含需要删除的键的数组，数组内部内容的格式必须为 `string` |


### 返回值
无

---

## 4、`clean`
### 作用
删除存储的所有数据

### 参数
无

### 返回值
无

