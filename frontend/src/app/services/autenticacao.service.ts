import { Injectable } from '@angular/core';
import {ApiService, Usuario} from './api.service';
import {StorageService} from './storage.service';

export interface LoginData {
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

        this.saveData(ok);
        this.logado = true;
        resolve(true);
      }, err => {
        console.error(err);
        resolve(false);
      });
    });
  }

  private async saveData(lgData: LoginData) {
    this.data = lgData;
    this.storageService.armazenar('login', lgData);
  }

  private async getData() {
    if (!this.data) {
      this.data = await this.storageService.recuperar('login');
    }
  }

  public async isLogado() {
    await this.getData();
    // Se estiver logado e se data não for nulo => true
    this.logado = this.logado && !!this.data;

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

  public async getBearer(): Promise<string> {
    this.getData();

    if (this.data) {
      return `Bearer ${this.data.token}`;
    }

    return null;
  }
}
