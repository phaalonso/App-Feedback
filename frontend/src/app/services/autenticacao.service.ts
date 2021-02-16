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

  private async loadData() {
      this.data = await this.storageService.recuperar('login');
  }

  private async getData() {
    if (!this.data) {
      this.loadData();
    }
    return this.data;
  }

  public async isLogado() {
    await this.loadData();
    // Se estiver logado e se data não for nulo => true

    if (!this.data) {
      return false;
    }

    console.log('Ta sim', this.data);
    return this.data.logado;
  }

  public async isAdmin() {
    if (!this.data) {
      await this.loadData();
    }

    console.log(this.data.acessoLevel === AcessLevel.ADMIN);
    return this.data.acessoLevel === AcessLevel.ADMIN;
  }

  public async deslogar() {
    if (this.data) {
      this.data.logado = false;
      this.saveData(this.data);
    }
  }

  public async getBearer(): Promise<string> {
    await this.getData();

    if (this.data) {
      return `Bearer ${this.data.token}`;
    }

    return null;
  }
}
