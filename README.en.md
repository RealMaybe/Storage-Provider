# *Storage Provider* Constructor

---

This document is currently available in three languages: Chinese, English, and Japanese.

- Chinese: [Chinese document](./ReadMe.md)
- English: This file
- Japanese: [Japanese document](./ReadMe.jp.md)

---

## One, Introduction

The *Storage Provider* provides a storage API for storing and retrieving data.

This API has the following methods:

1. Set or get stored data
    1. `Storage(key, value)` can set or get a single piece of stored data.
    2. `Save(key, value)` can set a single piece of stored data.
    3. `SaveMany(arr)` can set multiple pieces of stored data.
    4. `Get(key)` can get a single piece of stored data.
    5. `GetMany(arr)` can retrieve values corresponding to multiple keys from the storage.
    6. `GetAll()` can retrieve all data from the local storage.
2. Delete stored data
    1. `Delete(key)` can delete a single piece of stored data or all stored data.
    2. `Remove(key)` can delete a single piece of stored data.
    3. `RemoveMany(arr)` can delete multiple pieces of data from the local storage.
    4. `Clean()` can delete all stored data.

This storage API provides a convenient way to manage and manipulate stored data, enabling developers to easily store and retrieve various types of data. Whether at the session level or the local level, developers can use this API to meet their data storage needs.

---

---

## Two, Explanation

Nearly all methods may throw exceptions due to the following reasons:

**key**:

- `key` is not of type `string`
- `key` is an empty string

**arr**:

- Input parameter is not an array
- The array contains no valid data
- The array contains non-string elements
- Elements in the array are not objects
- Objects do not contain `key` and `value` properties

For specific reasons, please refer to the actual error message. Based on the above reasons, the aforementioned errors will not be explicitly mentioned in the method declarations.

---

---

## Three, Methods for storing and retrieving content

### 1. `Storage`

#### Purpose

Set or retrieve a single stored data.

#### Parameters

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| key | true | string | The key name of the data. |
| value | false | any | The value to be stored. |

#### Return Value

| Type | Description |
| --- | --- |
| void | If the value is valid, store the value and return nothing. |
| any | If the value is invalid, return the stored value. |

---

### 2. `Save`

#### Purpose

Set a single stored data.

#### Parameters

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| key | true | string | The key name of the data. |
| value | true | any | The value to be stored. |

#### Return Value

None

#### Exceptions

- Invalid value

---

### 3. `SaveMany`

#### Purpose

Set multiple stored data.

#### Parameters

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| arr | true | array | Multiple pieces of data to be stored, where each element in the array is an object containing `key` and `value` properties. |

#### Return Value

None

---

### 4. `Get`

#### Purpose

Retrieve a single stored data.

#### Parameters

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| key | true | string | The key name of the data. |

#### Return Value

Return the value corresponding to the retrieved key, with a type of any.

---

### 5. `GetMany`

#### Purpose

Retrieve the values corresponding to multiple keys from the storage.

#### Parameters

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| arr | true | array | An array containing the keys for which values need to be retrieved. |

#### Return Value

An array of objects containing key-value pairs.
Format example: `[{key1: value1}, {key2: value2}, ...]`.

---

### 6. `GetAll`

#### Purpose

Retrieve the values corresponding to multiple keys from the storage.

#### Parameters

None

#### Return Value

An object containing all locally stored data.
Format example: `[{key1: value1}, {key2: value2}, ...]`.

---

---

## Four, Methods for deleting stored data

### 1. `Delete`

#### Purpose

Delete stored data.

#### Parameters

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| key | false | string | The key name of the data to be deleted. |

#### Return Value

None.

---

### 2. `Remove`

#### Purpose

Delete a single piece of stored data.

#### Parameters

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| key | true | string | The key name of the data to be deleted. |

#### Return Value

None.

---

### 3. `RemoveMany`

#### Purpose

Delete multiple pieces of stored data.

#### Parameters

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| arr | true | array | An array containing the keys to be deleted. The format of the contents within the array must be `string`. |

#### Return Value

None.

---

### 4. `Clean`

#### Purpose

Delete all stored data.

#### Parameters

None

#### Return Value

None.
