import { Injectable } from '@angular/core';
import {ApiService, Usuario} from './api.service';
import {StorageService} from './storage.service';

export interface LoginData {
  token: string;
  acessoLevel: number;
  logado: boolean;
}

enum AcessLevel {
  USUARIO = 0,
  ADMIN = 1,
}

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  private data: LoginData;

  constructor(
    private storageService: StorageService,
    private apiService: ApiService,
  ) {  }

  public login(user: Usuario) {
    return new Promise((resolve, _) => {
      this.apiService.logar(user).subscribe((ok: LoginData) => {
        this.data = ok;
        this.data.logado = true;

        this.saveData(ok);
        resolve(true);
      }, err => {
        console.error(err);
        resolve(false);
      });
    });
  }

  private async saveData(lgData: LoginData) {
    this.storageService.armazenar('login', lgData);
  }

  private async getData() {
    if (!this.data) {
      this.data = await this.storageService.recuperar('login');
    }
    console.log('Get data', this.data);

    return this.data;
  }

  public async isLogado() {
    console.log('Esta logado');
    await this.getData();
    // Se estiver logado e se data não for nulo => true

    if (!this.data) {
      console.log('Nope');
      return false;
    }

    console.log('Ta sim', this.data);
    return this.data.logado;
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
    if (this.data) {
      this.data.logado = false;
      this.saveData(this.data);
    }
  }

  public async getBearer(): Promise<string> {
    this.getData();

    if (this.data) {
      return `Bearer ${this.data.token}`;
    }

    return null;
  }
}
