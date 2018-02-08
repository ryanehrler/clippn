import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import * as firebase from 'firebase/app';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';
import { Observable } from 'rxjs/Observable';

import { error } from 'selenium-webdriver';
import { IUser } from '../../../shared/models/user';
// import { IUser } from './user';

@Injectable()
export class AuthService {
  user: Observable<IUser>;
  isLoggedIn = false;

  constructor(
    private fireAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) {
    // Get auth data, then get firestore user document || null
    this.user = this.fireAuth.authState.switchMap(user => {
      if (user) {
        this.isLoggedIn = true;
        return this.firestore.doc<IUser>(`users/${user.uid}`).valueChanges();
      } else {
        this.isLoggedIn = false;
        return Observable.of(null);
      }
    });
  }

  // this currently does nothing -- may be used for route guard
  authenticated() {
    return this.user
      .take(1)
      .map(user => !!user)
      .do(loggedIn => {
        if (!loggedIn) {
          this.isLoggedIn = false;
          this.router.navigate(['login']);
        }
      });
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  createUser(user: IUser) {
    console.log(user);
    this.fireAuth.auth
      .createUserWithEmailAndPassword(user.username, user.password)
      .then(data => {
        console.log(data);
        this.updateUserData(data);
      });
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
      this.router.navigate(['/']);
    });
  }

  private oAuthLogin(provider) {
    return this.fireAuth.auth.signInWithPopup(provider).then(credential => {
      this.updateUserData(credential.user);
    });
  }

  private updateUserData(user: IUser) {
    const userRef: AngularFirestoreDocument<any> = this.firestore.doc(
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
