"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const collections_1 = require("../collections");
const authKey_dataService_1 = require("../dataServices/authKey.dataService");
class AuthKeyFunction {
    constructor(admin) {
        this.admin = admin;
        this.collections = new collections_1.Collections(this.admin);
        this.authKeyDataService = new authKey_dataService_1.AuthKeyDataService(this.admin);
    }
    ValidateKey(key) {
        return new Promise((resolve, reject) => {
            const query = this.collections
                .cdKeyCol()
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
    RegisterKey(id) {
        return new Promise((resolve, reject) => {
            const key = this.authKeyDataService.GetCdKey(id).then(cdKey => {
                if (key !== undefined) {
                    this.collections
                        .cdKeysDoc(id)
                        .set({ redeemed: true })
                        .then(() => {
                        resolve(true);
                    })
                        .catch(error => {
                        //TODO: Add errors logging
                        resolve(false);
                    });
                }
                else {
                    resolve(false);
                }
            });
        });
    }
    returnFalse() {
        return { result: false };
    }
}
exports.AuthKeyFunction = AuthKeyFunction;
//# sourceMappingURL=auth-key.function.js.map