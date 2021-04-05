// TODO: there's got to be a standard library with adapters already published

export type CacheableValue = string | number | boolean | { [key: string]: any };

export interface MetadataCacheImplementation {
  init(): Promise<void>;
  clear(): Promise<void>;
  set(key: string, value: CacheableValue): Promise<void>;
  get<T>(key: string): Promise<T>;
}
