import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;
  constructor(private afAuth: AngularFireAuth, public router: Router,
  ) {
    this.afAuth.authState.subscribe((user) => {

      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }



  async login(email: string, password: string): Promise<boolean> {
    try {
      const userCredential = await this.afAuth.signInWithEmailAndPassword(email, password);
      if (userCredential && userCredential.user) {
        // Autenticação bem-sucedida
        return true;
      } else {
        // Autenticação falhou
        return false;
      }
    } catch (error) {
      // Tratamento de erro
      console.error('Erro ao autenticar usuário:', error);
      return false;
    }
  }


  async logout(): Promise<void> {
    this.router.navigate(['/login']);
    await this.afAuth.signOut();
  }

  isLoggedIn(): boolean {
    return this.afAuth.currentUser !== null;
  }

  async registerUser(email: string, password: string) {
    return await this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  async resetPassword(email: string) {
    return await this.afAuth.sendPasswordResetEmail(email);
  }

  async isAuthenticated(): Promise<boolean> {
    const user = JSON.parse(localStorage.getItem('user')!);
    console.log(user)
    return user !== null && !!user.email
  }

  async getProfile(): Promise<firebase.default.User | null> {
    return this.afAuth.currentUser;
  }
}
