"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AuthKeyFunction {
    constructor(admin) {
        this.admin = admin;
    }
    ValidateKey(key) {
        return new Promise((resolve, reject) => {
            resolve(true);
        });
        // return this.admin
        //   .database()
        //   .ref('/cdKeys/')
        //   .once('value');
    }
}
exports.AuthKeyFunction = AuthKeyFunction;
//# sourceMappingURL=auth-key.function.js.map