import faunadb, { errors, query as q } from 'faunadb';

import { CacheableValue, MetadataCacheImplementation } from './types';

export class FaunaDBCache implements MetadataCacheImplementation {
  protected client: faunadb.Client;

  constructor(secret: string, protected collection: string, protected index: string) {
    this.client = new faunadb.Client({ secret });
  }

  async init(): Promise<void> {
    await this.upsertIndex();
  }

  async clear(): Promise<void> {
    await this.client.query(
      q.Map(
        q.Paginate(q.Documents(q.Collection(this.collection)), { size: 9999 }),
        q.Lambda(['ref'], q.Delete(q.Var('ref'))),
      ),
    );
  }

  async set(key: string, value: CacheableValue): Promise<void> {
    // this upsert seems overly complex, but whatever
    await this.client.query(
      q.If(
        q.Exists(q.Match(q.Index(this.index), key)),
        q.Update(q.Select('ref', q.Get(q.Match(q.Index(this.index), key))), { data: { value } }),
        q.Create(q.Collection(this.collection), { data: { key, value } }),
      ),
    );
  }

  async get<T>(key: string): Promise<T> {
    try {
      const result = await this.client.query<{ data: { value: T } }>(
        q.Get(q.Match(q.Index(this.index), key)),
      );
      return result.data.value;
    } catch (error) {
      if (error instanceof errors.NotFound) return null;
      throw error;
    }
  }

  async remove(key: string): Promise<void> {
    try {
      await this.client.query(q.Delete(q.Select('ref', q.Get(q.Match(q.Index(this.index), key)))));
    } catch (error) {
      if (error instanceof errors.NotFound) return;
      throw error;
    }
  }

  protected async upsertIndex(): Promise<void> {
    await this.client.query(
      q.If(
        q.IsIndex(q.Index(this.index)),
        null,
        q.CreateIndex({
          name: this.index,
          unique: true,
          source: q.Collection(this.collection),
          terms: [{ field: ['data', 'key'] }],
        }),
      ),
    );
  }
}
