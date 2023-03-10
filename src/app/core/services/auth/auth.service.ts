import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from 'angularfire2/firestore';

import { firebase } from '@firebase/app';

import { Observable, of, from } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';

import { error } from 'selenium-webdriver';
import { IUser } from '../../../shared/models/user';
// import { IUser } from './user';

@Injectable()
export class AuthService {
  user: Observable<IUser>;
  userId: string;
  isLoggedIn = false;
  onLoginRoute = 'analyzer/add-video';

  constructor(
    private fireAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    // Get auth data, then get firestore user document || null
    this.user = this.fireAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          if (!this.isLoggedIn) {
            this.isLoggedIn = true;
            this.router.navigate([this.onLoginRoute]);
          }

          this.userId = user.uid;

          return this.afs.doc<IUser>(`users/${user.uid}`).valueChanges();
        } else {
          this.isLoggedIn = false;
          return of(null);
        }
      })
    );
  }

  // this currently does nothing -- may be used for route guard
  authenticated() {
    return this.user.pipe(
      take(1),
      map(user => !!user),
      tap(loggedIn => {
        if (!loggedIn) {
          this.isLoggedIn = false;
          this.router.navigate(['login']);
        }
      })
    );
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  createUser(user: IUser) {
    console.log(user);
    // create the user and email in Google's authentication system
    return from(
      this.fireAuth.auth.createUserWithEmailAndPassword(
        user.username,
        user.password
      )
    ).pipe(
      // create the user data in firebase
      map(result => {
        console.log(result);
        return from(this.updateUserData(result.user));
      })
    );
  }

  signInUser(user: IUser) {
    console.log(user);
    this.fireAuth.auth
      .signInWithEmailAndPassword(user.username, user.password)
      .then(data => {
        console.log(data);
        this.updateUserData(data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  signOut() {
    this.fireAuth.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }

  private oAuthLogin(provider) {
    return this.fireAuth.auth.signInWithPopup(provider).then(credential => {
      this.updateUserData(credential.user);
    });
  }

  private updateUserData(user: IUser) {
    console.log('----UpdateUserData------');

    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );

    // console.log(userRef);
    const data: IUser = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    };

    return userRef.set(data);
  }
}
