import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { LoadingController, ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import {AutenticacaoService, LoginData} from './autenticacao.service';
import {StorageService} from './storage.service';

export interface LoginResponse {
  token: string;
}

export enum FeedbackType {
  CRITICA = 0,
  SUGESTAO = 1,
  ELOGIO = 2
}

export interface Usuario {
  id?: number;
  nome?: string;
  email: string;
  senha: string;
}

export interface Image {
  id: number;
  url: string;
}

export interface Feedback {
  id: number;
  titulo: string;
  mensagem: string;
  usuario: Usuario;
  images: Image[];
  tipo: FeedbackType;
  aprovada: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private storage: StorageService
  ) { }

  public logar(usuario: Usuario) {
    const url = `${environment.serverUrl}/login`;

    return this.http.post(url, usuario);
  }

  public getPostagens(aprovada: boolean = true): Promise<any> {
    const url = `${environment.serverUrl}/postagem`;

    const params = new HttpParams({
      fromObject: {
        aprovada: aprovada.toString()
      }
    });

    return new Promise((resolve, reject) => {
      this.http.get(url, { params }).subscribe((res: LoginResponse) => {
        resolve(res);
      }, err => {
        reject(err);
      });
    });
  }

  public async uploadPostagem(postagem: Feedback): Promise<boolean> {
    const url = `${environment.serverUrl}/postagem`;
    const loading = await this.loadingCtrl.create({
      message: 'Uploading...'
    });

    await loading.present();

    const formData = new FormData();

    formData.append('titulo', postagem.titulo);
    formData.append('mensagem', postagem.mensagem);
    formData.append('tipo', postagem.tipo.toString());
    formData.append('usuario', postagem.usuario.toString());

    console.log('Img da postagem', postagem.images);

    for (let img of postagem.images) {
      const blob = await fetch(img.url).then(r => r.blob());

      formData.append('imagens', blob, );
    }

    return new Promise((resolve, _) => {
      this.http.post<boolean>(url, formData).subscribe(ok => {
        loading?.dismiss();
        this.showToast('Upload realizado com sucesso');
        resolve(true);
      }, err => {
        loading?.dismiss();
        this.showToast('Falha no upload');
        resolve(false);
      });
    });
  }

  public getFeedBackString(type: FeedbackType): string {
    if (type === 0) { return 'Crítica'; }
    if (type === 1) { return 'Sugestão'; }
    if (type === 2) { return 'Elogio'; }

    return '';
  }

  public async autorizar(id: number) {
    const url = `${environment.serverUrl}/aprovar/${id}`;

    const lgData: LoginData = await this.storage.recuperar('login');

    if (!lgData.token) {
      return false;
    }

    const bearer = `Bearer ${lgData.token}`;

    const headers = new HttpHeaders({ Authorization: bearer });

    return new Promise((resolve, reject) => {
      this.http.post(url, { aprovada: true }, { headers }  ).subscribe(ok => {
        resolve(ok);
      }, err => {
        reject(err);
      });
    });
  }

  public async cadastrarUsuario(usuario: Usuario) {
    const url = `${environment.serverUrl}/user`;

    return new Promise((resolve, reject) => {
      this.http.post(url, usuario).subscribe(ok => {
        this.showToast('Usuario cadastrado com sucesso');
        resolve(ok);
      }, err => {
        if (err.status === 409) {
          this.showToast(err.error.message);
        }
        reject(err);
      });
    });
  }

  public async deletar(id: number) {
    const url = `${environment.serverUrl}/postagem/${id}`;

    const lgData: LoginData = await this.storage.recuperar('login');

    if (!lgData.token) {
      return false;
    }

    const bearer = `Bearer ${lgData.token}`;

    const headers = new HttpHeaders({ Authorization: bearer });

    return new Promise((resolve, reject) => {
      this.http.delete(url, { headers }  ).subscribe(ok => {
        resolve(ok);
      }, err => {
        reject(err);
      });
    });
  }

  private async showToast(message: string) {
      const toast = await this.toastCtrl.create({
        message,
        duration: 3000,
        position: 'bottom'
      });

      toast.present();
  }

}
