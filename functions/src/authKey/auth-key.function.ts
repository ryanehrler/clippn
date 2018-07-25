export class AuthKeyFunction {
  constructor(private admin: any) {}

  public ValidateKey(key: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const query = this.admin
        .firestore()
        .collection('cdKeys')
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

  private returnFalse() {
    return { result: false };
  }
}
