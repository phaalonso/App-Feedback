import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CriarFeedbackPage } from '../criar-feedback/criar-feedback.page';
import { ApiService, Feedback, FeedbackType } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public feedbacks: Feedback[] = [];

  constructor(
    public modalController: ModalController,
    public apiService: ApiService
  ) {

    this.loadData();
  }

  async loadData() {
    const data = await this.apiService.getPostagens();
    console.log(data);

    this.feedbacks = data;
  }

  getFeedBackString(type: FeedbackType): string {
    if (type === 0) { return 'Crítica'; }
    if (type === 1) { return 'Sugestão'; }
    if (type === 2) { return 'Elogio'; }

    return '';
  }

  async criarFeedback() {
    const modal = await this.modalController.create({
      component: CriarFeedbackPage,
      componentProps: {
        feedbacks: this.feedbacks
      }
    });

    await modal.present();
    console.log(this.feedbacks);
  }

}
