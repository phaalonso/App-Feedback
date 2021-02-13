import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CriarFeedbackPage } from '../criar-feedback/criar-feedback.page';
import { ApiService, Feedback, FeedbackType } from '../services/api.service';
import {AutenticacaoService} from '../services/autenticacao.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public feedbacks: Feedback[] = [];

  constructor(
    public modalController: ModalController,
    public apiService: ApiService,
    public router: Router,
    private autenticacaoService: AutenticacaoService,
  ) {
    // Prossiga para a página caso esteja logado, senão redireciona

    this.autenticacaoService.isLogado().then(res => {
      if (!this.autenticacaoService.isLogado()) {
        this.router.navigate(['/login']);
      } else {
        this.apiService.getPostagens().then(data => {
          console.log(data);
          this.feedbacks = data;
        });
      }
    });
  }

  public getFeedBackString(type: FeedbackType): string {
    if (type === 0) { return 'Crítica'; }
    if (type === 1) { return 'Sugestão'; }
    if (type === 2) { return 'Elogio'; }

    return '';
  }

  public async criarFeedback() {
    const modal = await this.modalController.create({
      component: CriarFeedbackPage,
      componentProps: {
        feedbacks: this.feedbacks
      }
    });

    await modal.present();
    console.log(this.feedbacks);
  }

  public async deslogar() {
    this.autenticacaoService.deslogar();
    this.router.navigate(['/login'])
  }

}
