import { Injectable, NgZone } from '@angular/core';
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
    public router: Router,
    public ngZone: NgZone //notifica si hay tareas en cola
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
    return this.afauth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        if (result.user?.emailVerified == true) {
          console.log(result.user)
          this.ngZone.run(() => {
            this.router.navigate(['preguntas']);
          });
          this.SetUserData(result.user);
        } else {
          this.afauth.signOut()
            .then(() => {
              window.alert("El usuario no ha validado su perfil");
              window.location.reload() 
            })
        }
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  //registrarse con email y contraseña
  async SignUp(email: string, password: string) {
    return this.afauth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {

        this.VerificationMail();
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert("El cooreo ingresado no se pudo verificar");
      });
  }

  // Send email verfificaiton when new user sign up
  async VerificationMail() {
    return this.afauth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verificar-correo']);
      });
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
