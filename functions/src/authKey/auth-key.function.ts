export class AuthKeyFunction {
  constructor(private admin: any) {}

  public ValidateKey(key: string): Promise<any> {
    return new Promise<boolean>((resolve, reject) =>{
      resolve(true);
    })
    // return this.admin
    //   .database()
    //   .ref('/cdKeys/')
    //   .once('value');
  }
}