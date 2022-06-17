import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

import firebase from 'firebase/compat/app';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  userData: any;
  constructor(
    public afauth: AngularFireAuth,
    public store: AngularFirestore,
    public router: Router
  ) {
    this.afauth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        JSON.parse(localStorage.getItem('user')!);
        localStorage.setItem('user', JSON.stringify(this.userData));
      } else {
        JSON.parse(localStorage.getItem('user')!);
        localStorage.setItem('user', 'null');
      }
    });
  }

  async login(email: string, password: string) {
    try {
      return await this.afauth
        .signInWithEmailAndPassword(email, password)      
        
    } catch (error) {
      return null;
    }
  }
  async loginRegistre(email: string, password: string) {
    try {
      return await this.afauth
        .createUserWithEmailAndPassword(email, password)        
    } catch (error) {
      return null;
    }
  }

  async resetPassword(email: string) {
    try {
      return this.afauth.sendPasswordResetEmail(email);
    } catch (error) {
      return null;
    }
  }
  async loginGoogle(email: string, password: string) {
    try {
      return await this.afauth
        .signInWithPopup(new firebase.auth.GoogleAuthProvider())       
    } catch (error) {
      return null;
    }
  }

  getUserLogged() {
    return this.afauth.authState;
  }


  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.store.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }
}
