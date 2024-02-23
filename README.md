# Storage Provider

```markdown
- 本文档基于 **StorageProvider v0.1.1-bata** 版本。
- 不同的版本所对应的文档可能存在不一致。
- 为保证数据、说明等的完善性，本文档可能更新较为频繁。
```

---

---

# Storage Provider 说明文档

## 简介

*Storage Provider* 提供了一个用于存储和获取数据的方法库。

本方法库基于原生 JavaScript 中的 localStorage 和 sessionStorage 所提供的一些方法进行了封装。

本方法库具有以下方法：

| 所属 | 方法 |
| --- | --- |
| 设置 或 获取 | `Storage(key, value)` |
| 设置 | `Save(key, value)` |
| 设置 | `SaveMany(arr)` |
| 设置 | `Set(...arg)` |
| 获取 | `Get(key)` |
| 获取 | `GetMany(arr)` |
| 获取 | `GetAll()` |
| 删除 | `Delete(key)` |
| 删除 | `Remove(key)` |
| 删除 | `RemoveMany(arr)` |
| 删除 | `Clean()` |

该存储方法库提供了一些方便的方式来管理和操作存储的数据，使得开发人员可以轻松地存储和获取各种类型的数据。无论是在会话级别还是在本地级别，开发人员都可以使用该类方法来满足其数据存储需求。

---

---

## 更新日志

详见 [更新日志](./ChangeLog/ChangeLog.md)

---

---

## 开源协议

本开源库遵守 [MIT开源协议](./LICENSE)。
相关其他附加条款如下：

#### Additional terms

If you have any questions or need further information about the software, please feel free to contact the original author at any time:

- **Name:** RealMaybe
- **Email:** <realmaybe0429@qq.com>
- **Twtiier:** [@RealMaybe0429](<https://twitter.com/RealMaybe0429>)
- **Weibo:** [@也许吧真的RealMaybe](https://weibo.com/u/5678690912)

---

---

## 如何进行引入和配置函数

本方法库目前须要在 JavaScript 中使用 import 进行引入。
**v0.1.1** 及以前版本暂不支持在页面中直接使用 script 标签进行引入。

#### 示例代码：引入

```js
import { StorageProvider } from "StorageProvider.js";
```

发行版名称可能与本文档提供的名称不一致，按照正确的路径、名称引入即可。

使用 `StorageProvider()` 的时候，必须使用 `new` 来进行调用，该构造函数须要传入指定字符串来进行初始化配置，可选内容为 `"local"` 或者是 `"session"` 两个字符串来进行初始化。两个字符串对应的初始化方法分别为 `localStorage` 及 `sessionStorage` ，之后便可按照本文档中写明的相关方法进行使用。

使用 `$Storage` 的时候，默认配置为 `"local"` ，直接使用本文档中写明的相关方法即可。

#### 示例代码：使用

```js
// 使用 StorageProvider 来使用方法
import { StorageProvider } from "StorageProvider.js";

const $local = new StorageProvider("local");

$local.Save("arg", "hello"); // 此处所用方法仅为示例，请根据实际需要来使用对应方法
```

---

---

## 说明

### 近乎所有的方法都会出现的抛出异常缘由

**key** :

- `key` 不为 `string` 类型
- `key` 为空字符串

**arr** :

- 输入参数不为数组
- 数组内部无有效数据
- 验证项为 `string`
  - 数组内部数据存在非字符串
- 验证项为 `object`
  - 数组中的元素不是对象
  - 对象中不包含 `key` 和 `value` 属性

具体的原因请查看实际报错的内容。
基于如上缘由，所有声明的方法中，将不再写明上述报错。

### 使用本方法库时请注意

鉴于原生 JavaScript 中的 `localStorage` 和 `SessionStorage` 存储数据时所用的 `setItem()` 方法中，对于传入的 `key` 和 `value` 做了类型限制为 **string** ，所以在本方法库中：

- 所有的 **存储** 及 **获取** 方法中，存储的 `value` 在源码中已经使用 `JSON.stringify()` 和 `JSON.parse()` 方法进行了转换，建议不要将传入的数据再次进行本操作，否则可能会出现问题。

##### 上述问题的示例

```js
import { StorageProvider } from "StorageProvider.js";

const $local = new StorageProvider("local");

const obj = {
    key1: "value1",
    key2: [
        "value2-1",
        "value2-2",
        "value2-3"
    ],
    key3: {
        key: "value"
    }
}

$local.Save("obj", JSON.stringify(obj)); 
// 此处存储的值变成了如下样子
// "{\"key1\":\"value1\",\"key2\":[\"value2-1\",\"value2-2\",\"value2-3\"],\"key3\":{\"key\":\"value\"}}"
```

---

---

# Storage Provider 方法文档

## 存储及获取内容的方法

### 1. `Storage`

#### 作用

设置或获取单条存储数据

#### 参数

| 参数 | 必选 | 类型 | 说明 |
| --- | --- | --- | --- |
| key | ture | string | 数据的键名 |
| value | false | any | 要存储的值 |

#### 返回值

| 类型 | 说明 |
| --- | --- |
| void | 如果 value 有效，则存储值，无返回值 |
| any | 如果 value 无效，则返回存储的值 |

---

---

## 存储内容的方法

### 1. `Save`

#### 作用

设置单条存储数据

#### 参数

| 参数 | 必选 | 类型 | 说明 |
| --- | --- | --- | --- |
| key | ture | string | 数据的键名 |
| value | true | any | 要存储的值 |

#### 返回值

无

#### 抛出异常缘由

- value 无效

---

### 2. `SaveMany`

#### 作用

设置多条存储数据

#### 参数

| 参数 | 必选 | 类型 | 说明 |
| --- | --- | --- | --- |
| arr | ture | array | 要存储的多条数据，数组中的每个元素都必须是包含 `key` 和 `value` 属性的对象 |

#### 返回值

无

---

### 3. `Set`

#### 作用

设置单条或多条存储数据

#### 参数

| 参数 | 必选 | 类型 | 说明 |
| --- | --- | --- | --- |
| ...arg | ture | any | 要存储的单条或多条存储数据 |

##### 特别说明

- 本方法传入参数数量必须为 1 ~ 2 个
- 本方法传入参数的原则如下：
    1. 仅传入一个参数的情况下：
        - 参数为对象：
            - 对象的格式为 `{ key: value }`
            - 对象中不能存在无效值
            - 对象不得为空
            - 对象中可以存在多个键值对
            - 对象的属性键即为存储的 key
            - 对象的属性值即为存储的 value
        - 参数为数组：
            - 数组不得为空
            - 数组中的元素内容必须为对象
            - 数组中的元素内容对象格式为 `{ key: "string", value: any }`
            - 数组中不得包含其他类型的元素
    2. 传入两个参数的情况下：
        - 两个参数均须要有效
        - 第一个参数必须为字符串
        - 第二个参数类型可以是任意
        - 第一个参数将被解析为 key
        - 第二个参数将被解析为 value

#### 返回值

无

---

---

## 获取内容的方法

所有的获取方法在获取内容的时候，如果传入的 `key` 在存储中没有找到有效数据，则返回 `null` 。

### 1. `Get`

#### 作用

获取单条存储数据

#### 参数

| 参数 | 必选 | 类型 | 说明 |
| --- | --- | --- | --- |
| key | ture | string | 数据的键名 |

#### 返回值

| 类型 | 说明 |
| --- | --- |
| any | 返回获取到的键名对应的值 |

---

### 2. `GetMany`

#### 作用

从存储中获取多个键对应的值

#### 参数

| 参数 | 必选 | 类型 | 说明 |
| --- | --- | --- | --- |
| arr | ture | array | 包含需要获取值的键的数组 |

#### 返回值

| 类型 | 说明 | 格式示例 |
| --- | --- | --- |
| array | 包含键值对的对象数组 | `[{key1: value1}, {key2: value2}, ...]` |

---

### 3. `GetAll`

#### 作用

从存储中获取多个键对应的值

#### 参数

无

#### 返回值

| 类型 | 说明 | 格式示例 |
| --- | --- | --- |
| object | 包含所有本地存储数据的对象 | `{key1: value1, key2: value2, ...}` |

---

---

## 删除存储数据的方法

### 1、`Delete`

#### 作用

删除存储数据

#### 参数

| 参数 | 必选 | 类型 | 说明 |
| --- | --- | --- | --- |
| key | false | string | 要删除的数据的键名<br>传入参数，则删除单条<br>不传参数，则删除所有 |

#### 返回值

无

---

### 2、`Remove`

#### 作用

删除单条存储数据

#### 参数

| 参数 | 必选 | 类型 | 说明 |
| --- | --- | --- | --- |
| key | true | string | 要删除的数据的键名 |

#### 返回值

无

---

### 3、`RemoveMany`

#### 作用

删除多条存储数据

#### 参数

| 参数 | 必选 | 类型 | 说明 |
| --- | --- | --- | --- |
| arr | true | array | 包含需要删除的键的数组，数组内部内容的格式必须为 `string` |

#### 返回值

无

---

### 4、`Clean`

#### 作用

删除存储的所有数据

#### 参数

无

#### 返回值

无

---

---
