import { Collections } from '../collections';
import { CdKey } from '../models/collections/cdKeys.collection';

export class AuthKeyDataService {
  private collections: Collections;

  constructor(private admin: any) {
    this.collections = new Collections(admin);
  }

  GetCdKey(id: string): Promise<CdKey> {
    return new Promise<CdKey>((resolve, reject) => {
      let key: CdKey;
      this.collections
        .cdKeysDoc(id)
        .get()
        .then(doc => {
          if (doc !== undefined) {
            key = doc.data();
            key.id = doc.id;
          }
          resolve(key);
        })
        .catch(() => {
          resolve(key);
        });
    });
  }
}
