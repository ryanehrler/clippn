"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AuthKeyFunction {
    constructor(admin) {
        this.admin = admin;
    }
    ValidateKey(key) {
        return new Promise((resolve, reject) => {
            const query = this.admin
                .firestore()
                .collection('cdKeys')
                .where('key', '==', key)
                .where('redeemed', '==', false);
            query.get().then(queryDocs => {
                try {
                    if (queryDocs.docs.length > 0) {
                        const qDoc = queryDocs.docs[0];
                        const result = qDoc.data();
                        result.id = qDoc.id;
                        resolve(result);
                    }
                    else {
                        resolve(this.returnFalse());
                    }
                }
                catch (error) {
                    resolve(this.returnFalse());
                }
            }, () => {
                resolve(this.returnFalse());
            });
        });
    }
    returnFalse() {
        return { result: false };
    }
}
exports.AuthKeyFunction = AuthKeyFunction;
//# sourceMappingURL=auth-key.function.js.map