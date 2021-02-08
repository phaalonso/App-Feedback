import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CriarFeedbackPage } from '../criar-feedback/criar-feedback.page';

export enum FeedbackType {
  CRITICA = 0,
  SUGESTAO = 1,
  ELOGIO = 2
}

export interface Feedback {
  photo_path: string;
  title: string;
  message: string;
  type: FeedbackType
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public feedbacks: Feedback[] = [];

  constructor(
    public modalController: ModalController
  ) {
    this.feedbacks.push({
      title: 'Neque porro quisquam',
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eu nunc sit amet lorem malesuada accumsan nec vel sapien. Nam ut lacus consectetur velit tincidunt cursus. Quisque cursus elit ut ornare venenatis. Proin non risus tincidunt, rhoncus urna ac, suscipit metus.',
      photo_path: 'assets/wall.jpg',
      type: 0
    });

    this.feedbacks.push({
      title: 'Neque porro quisquam',
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eu nunc sit amet lorem malesuada accumsan nec vel sapien. Nam ut lacus consectetur velit tincidunt cursus. Quisque cursus elit ut ornare venenatis. Proin non risus tincidunt, rhoncus urna ac, suscipit metus.',
      photo_path: 'assets/wall.jpg',
      type: 1
    });

    this.feedbacks.push({
      title: 'Neque porro quisquam',
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eu nunc sit amet lorem malesuada accumsan nec vel sapien. Nam ut lacus consectetur velit tincidunt cursus. Quisque cursus elit ut ornare venenatis. Proin non risus tincidunt, rhoncus urna ac, suscipit metus.',
      photo_path: 'assets/wall.jpg',
      type: 2
    });
  }

  getFeedBackString(type: FeedbackType): string {
    if (type == 0) return 'Crítica';
    if (type == 1) return 'Sugestão';
    if (type == 2) return 'Elogio';

    return '';
  }

  async criarFeedback() {
    const modal = await this.modalController.create({
      component: CriarFeedbackPage,
      componentProps: {
        'feedbacks': this.feedbacks
      }
    });

    await modal.present();
    console.log(this.feedbacks);
  }

}
