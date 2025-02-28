type StorageType = "local" | "session";

interface ConfigBase {
    warn: boolean;
    circular?: boolean;
    monitor?: boolean;
    channelName?: string;
    prefix?: string;
    maxSize?: number;
}

type Config =
    | StorageType
    | ({ storageType: StorageType } & Omit<ConfigBase, "storageType">)
    | ({ type: StorageType } & Omit<ConfigBase, "type">);


let config: Config = {
    storageType: "local",
    warn: true,
};