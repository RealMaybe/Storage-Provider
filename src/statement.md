# 辅助函数（方法）的主函数、子函数命名规范

- **主函数：** $ + 首字母大写，使用驼峰命名法。
- **子函数：** _ + 首字母小写，使用驼峰命名法。

# 文件、文件夹命名规范

### 文件夹命名

无论是**主文件夹**还是**子文件夹**，均根据对应需求命名，使用驼峰命名法，不使用特定符号。

### 文件命名

以首字母大小写来区分**主文件**及**子文件**，使用驼峰命名法。

- **主文件：** 根据对应需求命名，首字母必须大写。
- **子文件：** 根据对应需求命名，首字母必须小写。

最外层入口文件（index.js）使用小写命名。

### 函数组织

- **主函数：** 放在 methods 文件夹中。
- **子函数、二级子函数：** 放在 utils 文件夹中。

---

# 文件夹结构树

```txt
/src
|-- /methods
|   |-- Checker.js
|   |-- Data.js
|   |-- Parameter.js
|-- /settings
|   |-- /config
|   |   |-- default.js
|   |-- recommend.js
|-- /utils
|   |-- /checker
|   |   |-- circularReferenceChecker.js
|   |-- /data
|   |   |-- /delete
|   |   |   |-- Delete.js
|   |   |-- /get
|   |   |   |-- All.js
|   |   |   |-- Many.js
|   |   |-- /set
|   |   |   |-- ObjectMany.js
|   |   |   |-- ObjectValue.js
|   |   |   |-- Set.js
|   |   |-- /value
|   |   |   |-- Store.js
|   |-- /parameter
|   |   |-- Array.js
|   |   |-- Key.js
|   |   |-- Object.js
|   |   |-- Value.js
|   |-- /size
|   |   |-- storageSize.js
|   |-- /storageValue
|   |   |-- getValue.js
|   |   |-- SetValue.js
|-- storage.js
|-- index.js
```

# 循环引用处理

```js
JSON.stringify(obj, (_, val) => {
    if (typeof val === "object" && val !== null) {
        if (cache.indexOf(val) !== -1) return;
        cache.push(val);
    }
    return val;
})
```
