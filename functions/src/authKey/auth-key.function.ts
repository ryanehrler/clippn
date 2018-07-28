import { Collections } from '../collections';
import { CdKey } from '../models/collections/cdKeys.collection';
import { AuthKeyDataService } from '../dataServices/authKey.dataService';

export class AuthKeyFunction {
  collections: Collections;
  authKeyDataService: AuthKeyDataService;

  constructor(private admin: any) {
    this.collections = new Collections(this.admin);
    this.authKeyDataService = new AuthKeyDataService(this.admin);
  }

  public ValidateKey(key: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const query = this.collections
        .cdKeyCol()
        .where('key', '==', key)
        .where('redeemed', '==', false);

      query.get().then(
        queryDocs => {
          try {
            if (queryDocs.docs.length > 0) {
              const qDoc = queryDocs.docs[0];
              const result = qDoc.data();
              result.id = qDoc.id;
              resolve(result);
            } else {
              resolve(this.returnFalse());
            }
          } catch (error) {
            resolve(this.returnFalse());
          }
        },
        () => {
          resolve(this.returnFalse());
        }
      );
    });
  }

  public RegisterKey(id: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const key = this.authKeyDataService.GetCdKey(id).then(cdKey => {
        if (key !== undefined) {
          this.collections
            .cdKeysDoc(id)
            .update({ redeemed: true })
            .then(() => {
              resolve(true);
            })
            .catch(error => {
              //TODO: Add errors logging
              resolve(false);
            });
        } else {
          resolve(false);
        }
      });
    });
  }

  private returnFalse() {
    return { result: false };
  }
}
