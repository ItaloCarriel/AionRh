import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth) { }



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
    return this.afAuth.currentUser !== null;
  }

  async getProfile(): Promise<firebase.default.User | null> {
    return this.afAuth.currentUser;
  }
}
