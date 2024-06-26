# Storage Provider

## 简介

*Storage Provider* 提供了一个用于存储和获取数据的方法库。

本方法库基于原生 JavaScript 中的 localStorage 和 sessionStorage 所提供的一些方法进行了封装。

该存储方法库提供了一些方便的方式来管理和操作存储的数据，使得开发人员可以轻松地存储和获取各种类型的数据。

无论是在 **本地级别** 还是在 **会话级别** ，开发人员都可以使用该类方法来满足其数据存储需求。

---
---

## 官方文档

- **官方文档** 请见：[Storage Provider - 官方文档](https://www.yuque.com/realmaybe0429/storage-provider)
- **说明文档** 请见：[Storage Provider - 说明文档](https://www.yuque.com/realmaybe0429/storage-provider/documentation)
- **方法文档** 请见：[Storage Provider - 方法文档](https://www.yuque.com/realmaybe0429/storage-provider/method)
- **更新日志** 请见：[Storage Provider - 更新日志](https://www.yuque.com/realmaybe0429/storage-provider/change-log)

---
---

## 开源协议

本开源库遵守 MIT 开源协议。

相关其他附加条款如下：

#### Additional terms

If you have any questions or need further information about the software, please feel free to contact the original author at any time:

- **Name:** RealMaybe
- **Email:** <realmaybe0429@qq.com>
- **Weibo:** [@也许吧真的RealMaybe](https://weibo.com/u/5678690912)
- **Twitter:** [@RealMaybe0429](<https://twitter.com/RealMaybe0429>)

---
---

## 安装和配置

本方法库目前须要在 JavaScript 中使用 `import` 进行引入。
现行版本**仅支持 window 环境**，不支持 nodejs 环境及其他环境。
现行版本**暂不支持**在页面中直接使用 `<script></script>` 标签进行引入。

### 安装

请从源代码库中下载已发行版本的源码，然后按照下面的方式进行引入。

---

### 引入

```javascript
import { 
    StorageProvider,
    $local,
    $session
} from "StorageProvider.js";
```

发行版名称可能与本文档提供的名称不一致，按照正确的路径、名称引入即可。

使用 `StorageProvider()` 的时候，必须使用 `new` 来进行调用，该构造函数须要传入指定格式的 `object` 或者 `string` 来进行初始化配置。

---

### 配置

在 StorageProvider 的源码中，有默认的配置项，默认的配置项如下：

```javascript
const defaultOptions = {
    type: "local",            // 默认存储类型 localStorage
    maxSize: 1048576,         // 最大存储大小 1,048,576 字节，即 1MB
    warn: true                // 是否在控制台弹出警告信息
}
```

在使用 `StorageProvider()` 的时候，可以传入一个配置对象来进行配置，也可以使用指定的字符串来进行配置。

配置对象可以包含以下属性：

| 属性 | 类型 | 默认值 | 解释 | 备注 |
| :--- | :--- | :--- | :--- | :--- |
| `type` | `string` | `local` | 存储类型，可选值为 `local` 或 `session` | `local` 为 localStorage，`session` 为 sessionStorage |
| `maxSize` | `number` | `local` | 最大存储大小，单位为字节 | 默认为 `1048576` 字节，即 `1MB` |
| `warn` | `boolean` | `true` | 是否在控制台弹出警告信息 | `true` 为弹出警告信息，`false` 为不弹出警告信息 |

现版本中，以下属性 **暂未启用**

- 如果在配置对象中指定，则会被忽略
- 如果仅存在如下属性，则会报错

| 属性 | 类型 | 默认值 | 解释 | 备注 |
| :--- | :--- | :--- | :--- | :--- |
| `encrypt` | `boolean` | `false` | 存储是否加密 | `true` 为加密，`false` 为不加密 |
| `compress` | `boolean` | `false` | 存储是否压缩 | `true` 为压缩，`false` 为不压缩 |
| `expiration` | `boolean` | `false` | 存储是否过期 | `true` 为过期，`false` 为不过期 |
| `time` | `number` | `86400000` | 存储的过期时间，单位为毫秒 | 默认为 `86400000` 毫秒，即 `24` 小时 |
| `prefix` | `string` | `"myApp_"` | 存储的 key 的前缀，用于配合过期使用 |  |

指定配置字符串的示例如下：

| 配置字符串 | 解释 |
| :--- | :--- |
| `"local"` | 使用 localStorage 进行存储 |
| `"session"` | 使用 sessionStorage 进行存储 |

---

#### 配置示例

**正确的配置（一）：使用配置对象来配置**

```javascript
// 使用 import 来引入 StorageProvider
import { StorageProvider } from "StorageProvider.js";

// 传入配置对象
const $local = new StorageProvider({ type: "local" });

// 此处所用方法仅为示例，请根据实际需要来使用对应方法
$local.Save("arg", "hello");
```

**正确的配置（二）：使用配置字符串来配置**

```javascript
// 使用 import 来引入 StorageProvider
import { StorageProvider } from "StorageProvider.js";

// 传入配置字符串
const $local = new StorageProvider("local");

// 此处所用方法仅为示例，请根据实际需要来使用对应方法
$local.Save("arg", "hello");
```

**错误的配置示例**

```javascript
// 使用 import 来引入 StorageProvider
import { StorageProvider } from "StorageProvider.js";

const $local = new StorageProvider(); // 没有进行配置
// Uncaught Error: Please pass in a valid 'string' or 'object' parameter and try again.

const $local = new StorageProvider({}); // 配置对象为空
const $local = new StorageProvider({ key: "local" }); // 配置对象不含指定属性
// Uncaught Error: The configuration object must contain at least one of the following attributes: 'type', 'maxSize', 'warn'.

const $local = new StorageProvider("invalid"); // 配置字符串无效
// Uncaught Error: Please pass in a valid 'string' or 'object' parameter and try again.

const $local = new StorageProvider(["local"]); // 其他非指定类型参数
// Uncaught Error: Please pass in a valid 'string' or 'object' parameter and try again.
```

---

当然，在实际使用中，开发人员可以根据自己的需求来进行配置。如果不想手动进行配置，可以直接引入已经配置好的方法来直接使用。

**使用 localStorage**

```javascript
// 使用 import 来引入已经配置好的 $local
import { $local } from "StorageProvider.js";

// 此处所用方法仅为示例，请根据实际需要来使用对应方法
$local.Save("arg", "hello");
```

**使用 sessionStorage**

```javascript
// 使用 import 来引入已经配置好的 $session
import { $session } from "StorageProvider.js";

// 此处所用方法仅为示例，请根据实际需要来使用对应方法
$session.Save("arg", "hello");
```

---
---

## 其他说明

### 关于 localStorage 和 sessionStorage

1. localStorage 和 sessionStorage 都是 HTML5 规范中提供的本地存储方案，可以将数据存储在浏览器本地，供当前页面或下一页面访问。
1. localStorage 存储的数据在浏览器关闭后依然存在，除非手动清除；sessionStorage 存储的数据在同一标签页关闭后清除。
1. localStorage 和 sessionStorage 都可以存储各种类型的数据，包括字符串、数字、对象、数组等。
1. localStorage 和 sessionStorage 并没有直接提供设置过期时间的功能，数据会一直存在，直到被手动清除或者浏览器的存储空间被清除。
1. localStorage 和 sessionStorage 都有容量限制，但是并没有提供设置最大存储容量的功能。当存储空间被占满时，浏览器会根据某种策略清除数据。
1. localStorage 和 sessionStorage 并没有提供设置前缀的功能。
1. localStorage 和 sessionStorage 是与域名相关联的，不同域名的页面无法共享它们的数据。
1. localStorage 和 sessionStorage 都有自己的 API，用于存储、获取、删除数据等操作。

### 关于本方法库

鉴于原生 JavaScript 中的 `localStorage` 和 `SessionStorage` 存储数据时所用的 `setItem()` 方法中，对于传入的 `key` 和 `value` 做了类型限制为 `string` ；同时，由于 `JSON.stringify()` 方法的限制，对于 `undefined`、`null`、`NaN`、`Infinity` 等值，都会被转换为 `null` 。

所以在本方法库中：

- 所有的方法中，的 `key` 必须是 `string` 类型。
- 所有的 **存储** 及 **获取** 方法中，无论是传入还是获取到的 `value` 在源码中已经使用 `JSON.stringify()` 和 `JSON.parse()` 方法进行了转换，不建议将传入或者获取到的 `value` 进行二次转换。
- 所有的 **存储** 方法中，的 `value` 可以是 `string`、`number`、`boolean`、`object`、`array` 等类型。
- 所有的 **存储** 方法中，的 `value` 不能为 `undefined`、`null`、`NaN`、`Infinity` 等值。
- 所有的 **获取** 方法中，如果 `key` 不存在，则返回 `null`。
- 所有的 **删除** 方法中，如果 `key` 不存在，则不进行操作，同时会返回警告。
- ~~所有的 **前缀、过期、加密、压缩** 等功能，仍在开发中，暂未启用。~~

### 其他注意事项

在 v0.1.2 及更高版本中，所有存储方法中均对传入的存储值做了二次处理：对值进行递归处理，处理内部可能存在的对象嵌套、循环引用等问题。

因此，如果有类似于如下方式定义的变量：

```javascript
let obj = { a: "a" };
obj.b = obj;

let arr = [1, 2, 3];
arr[3] = arr;
```

上述对象嵌套、循环引用等问题，将在底层代码中将会处理掉该问题。

**处理方法为：** 将循环引用的部分直接删除掉，不进行该部分进行存储。

因此，在外部代码中，请不要对存储值做循环引用，否则可能会导致数据不一致。

---
---

## 方法文档

- **方法文档** 请见：[Storage Provider - 方法文档](https://www.yuque.com/realmaybe0429/storage-provider/method)

---
---

## 更新日志

- **更新日志** 请见：[Storage Provider - 更新日志](https://www.yuque.com/realmaybe0429/storage-provider/change-log)
