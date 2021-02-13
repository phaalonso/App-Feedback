import { Injectable } from '@angular/core';
import {ApiService, Usuario} from './api.service';
import {StorageService} from './storage.service';

interface LoginData {
  token: string;
  acessoLevel: number;
}

enum AcessLevel {
  USUARIO = 0,
  ADMIN = 1,
}

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  private logado = false;
  private data: LoginData;

  constructor(
    private storageService: StorageService,
    private apiService: ApiService,
  ) {  }

  public login(user: Usuario) {
    return new Promise((resolve, _) => {
      this.apiService.logar(user).subscribe((ok: LoginData) => {
        console.log(ok);

        this.saveToken(ok);
        this.logado = true;
        resolve(true);
      }, err => {
        console.error(err);
        resolve(false);
      });
    });
  }

  private saveToken(lgData: LoginData) {
    this.data = lgData;
    this.storageService.armazenar('login', lgData);
  }

  public async isLogado() {
    if (!this.data) {
      this.data = await this.storageService.recuperar('login');
      // Se estiver logado e se data não for nulo => true
      this.logado = this.logado && !!this.data;
    }

    return this.logado;
  }

  public getAcessLevel() {
    if (this.data && this.data.acessoLevel) {
      return this.data.acessoLevel;
    }

    return null;
  }

  public isAdmin() {
    return this.getAcessLevel() === AcessLevel.ADMIN;
  }

  public async deslogar() {
    this.logado = false;
  }
}
