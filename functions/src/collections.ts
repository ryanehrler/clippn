/**
 * Firestore collection and doc boilerplate
 *
 * @export
 * @class Collections
 */
export class Collections {
  // a = admin
  constructor(private a: any) {}
  cdKeyCol(): any {
    return this.a.firestore().collection('cdKeys');
  }
  cdKeysDoc(id: string): any {
    return this.cdKeyCol().doc(id);
  }

  clipsCol() {
    return this.a.firestore().collection('clips');
  }
  clipsDoc(id: string) {
    return this.a.doc('clips/' + id);
  }

  usersCol() {
    return this.a.firestore().collection('users');
  }
  usersDoc(id: string) {
    return this.a.doc('users/' + id);
  }
}
