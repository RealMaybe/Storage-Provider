# Change Log

## v0.1.1-beta

#### Release Date

2024/02/09

#### Updates

Based on version v0.1.0, the following methods have been added:

- `Set` to set one or more storage data.

#### Backward Compatibility

Fully compatible

---

---

## v0.1.0

#### Release Date

2024/01/28

#### Updates

The following methods have been added:

1. Set or retrieve storage data
    1. `Storage(key, value)` to set or retrieve individual storage data.
    2. `Save(key, value)` to set individual storage data.
    3. `StorageMany(arr)` to set multiple storage data.
    4. `Get(key)` to retrieve individual storage data.
    5. `GetMany(arr)` to retrieve values corresponding to multiple keys from storage.
    6. `GetAll()` to retrieve all data from local storage.
2. Delete storage data
    1. `Delete(key)` to delete individual or all storage data.
    2. `Remove(key)` to delete individual stored data.
    3. `RemoveMany(arr)` to delete multiple data from local storage.
    4. `Clean()` to delete all stored data.
