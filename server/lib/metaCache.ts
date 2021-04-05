import { FaunaDBCache } from './cache/fauna';
import { MetadataCacheImplementation } from './cache/types';

type Resolver<T> = () => Promise<T>;

export class MetaCache {
  constructor(protected cache: MetadataCacheImplementation) {}

  async init() {
    await this.cache.init();
  }

  async clear() {
    await this.cache.clear();
  }

  async maybe<T>(key: string, resolve: Resolver<T>): Promise<T> {
    const value = await this.cache.get<T>(key);
    if (value !== null) return value;

    const _value = await resolve();
    await this.cache.set(key, _value);
    return _value;
  }
}

// TODO: move this singleton to a services file or something
export const cache = new MetaCache(
  new FaunaDBCache(process.env.FAUNA_DB_SECRET, 'metadata-cache', 'key_uniq'),
);
