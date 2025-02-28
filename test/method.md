# 关于本方法库

本方法库基于原生 JavaScript 中的 localStorage 和 sessionStorage 所提供的一些方法进行了封装。

该存储方法库提供了一些方便的方式来管理和操作存储的数据，使得开发人员可以轻松地存储和获取各种类型的数据。无论是在 `会话级别` 还是在 `本地级别` ，开发人员都可以使用该类方法来满足其数据存储需求。

本方法库提供了以下功能：

- 存储数据：可以将任意类型的数据存储到 localStorage 或 sessionStorage 中。
- 获取数据：可以从 localStorage 或 sessionStorage 中获取任意类型的数据。
- 存储过期：可以设置存储数据的过期时间，使得数据在指定时间后自动失效。
- 存储前缀：可以为存储的 key 添加前缀，方便管理和区分数据。
- 存储大小限制：可以设置存储数据的最大大小，超过限制时自动清除数据。
- 存储警告：可以设置是否在控制台弹出警告信息，以提醒开发人员注意存储数据。
- 存储类型：可以设置存储数据的类型，默认为 localStorage。
- 存储方法：提供了以下存储方法：
  - `Save(key, value)`：存储数据。
  - `Get(key)`：获取数据。
  - `Remove(key)`：删除数据。
  - `Clear()`：清除所有数据。
  - `Exists(key)`：判断数据是否存在。
  - `Keys()`：获取所有 key。
  - `Values()`：获取所有 value。
  - `Size()`：获取存储大小。
  - `IsExpired(key)`：判断数据是否过期。
  - `Expire(key, time)`：设置数据过期时间。
  - `SetPrefix(prefix)`：设置存储的 key 前缀。
  - `GetPrefix()`：获取存储的 key 前缀。
  - `SetMaxSize(maxSize)`：设置存储的最大大小。
  - `GetMaxSize()`：获取存储的最大大小。
  - `SetWarn(warn)`：设置是否弹出警告信息。
  - `GetWarn()`：获取是否弹出警告信息。
  - `GetType()`：获取存储的类型。
  - `SetType(type)`：设置存储的类型。
