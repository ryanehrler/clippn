import { Collections } from '../collections';
import { CdKey } from '../models/collections/cdKeys.collection';

export class AuthKeyDataService {
  private collections: Collections;

  constructor(private admin: any) {
    this.collections = new Collections(admin);
  }

  GetCdKey(id: string): CdKey {
    const doc = this.collections.cdKeysDoc(id).get();
    let key: CdKey;
    if (doc !== undefined) {
      key = doc.data();
      key.id = doc.id;
    }
    return key;
  }
}
