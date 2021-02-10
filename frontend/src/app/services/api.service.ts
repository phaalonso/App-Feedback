import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingController, ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

export enum FeedbackType {
  CRITICA = 0,
  SUGESTAO = 1,
  ELOGIO = 2
}

export interface Usuario {
  id: number;
  nome: string;
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
    private toastCtrl: ToastController
  ) { }

  /**
   * getPostagens
   */
  public getPostagens(): Promise<any> {
    const url = `${environment.serverUrl}/postagem`;

    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe((res: any) => {
        resolve(res);
      }, err => {
        reject(err);
      });
    });
  }

}
