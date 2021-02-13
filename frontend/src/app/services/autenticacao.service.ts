import { Injectable } from '@angular/core';
import {ApiService, Usuario} from './api.service';
import {StorageService} from './storage.service';

interface LoginData {
  token: string;
  accesLevel: string;
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

  public async deslogar() {
    this.logado = false;
  }
}
