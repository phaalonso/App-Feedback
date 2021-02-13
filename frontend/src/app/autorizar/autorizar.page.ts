import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LoadingController, ToastController} from '@ionic/angular';
import {ApiService, Feedback} from '../services/api.service';
import {AutenticacaoService} from '../services/autenticacao.service';

@Component({
  selector: 'app-autorizar',
  templateUrl: './autorizar.page.html',
  styleUrls: ['./autorizar.page.scss'],
})
export class AutorizarPage implements OnInit {

  public feedbacks: Feedback[];

  constructor(
    private router: Router,
    private autenticacaoService: AutenticacaoService,
    public apiService: ApiService,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) {
  }

  public async loadData() {
    this.feedbacks = await this.apiService.getPostagens(false);
  }

  ngOnInit() {
    // Redireciona, se o usuario não possuir permissão
    if (!this.autenticacaoService.isAdmin()) {
      this.router.navigate(['/home']);
    }

    this.loadData();
  }

  public async aprovar(id: number) {
    this.apresentarLoading('Aprovando a postagem');
    this.apiService.autorizar(id).then(res => {
      this.feedbacks = this.feedbacks.filter(fd => fd.id !== id)
      this.fecharLoading();
    }).catch(err => {
      console.error(err);
      this.fecharLoading();
      this.apresentarToast('Não foi possivel aprovar');
    });
  }

  public async deletar(id: number) {
    this.apresentarLoading('Deletando a postagem');
    this.apiService.deletar(id).then(res => {
      this.feedbacks = this.feedbacks.filter(fd => fd.id !== id)
      this.fecharLoading();
    }).catch(err => {
      this.fecharLoading();
      console.error(err);
      this.apresentarToast('Não foi possivel deletar');
    });
  }

  public async apresentarLoading(mensagem: string) {
    const load = await this.loadingController.create({
      message: mensagem
    });

    await load.present();
  }

  public async fecharLoading() {
    this.loadingController.dismiss();
  }

  public async apresentarToast(mensagem: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 2000
    });

    await toast.present();
  }

}
