import { StorageKey } from "@/src/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { setItem, getItem, removeItem } = AsyncStorage;

/**
 * OBTENER DATOS
 * @param key:AsyncStorageKey
 */
export const getData = async (
  key: StorageKey,
  isJson?: boolean
): Promise<any> => {
  try {
    const item = await getItem(key);

    if (isJson && item) {
      return JSON.parse(item);
    }

    return item;
  } catch {
    return false;
  }
};

/**
 * GUARDAR DATOS
 * @param key:AsyncStorageKey
 * @param value
 */
export const storeData = async (key: StorageKey, value: any) => {
  try {
    if (typeof value === "string") {
      await setItem(key, value);
      return;
    }
    await setItem(key, JSON.stringify(value));
  } catch {
    return false;
  }
};

/**
 * ELIMINAR DATOS
 * @param key:AsyncStorageKey
 */
export const removeData = async (key: StorageKey) => {
  try {
    await removeItem(key);
  } catch {
    return false;
  }
};
