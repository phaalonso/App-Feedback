import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { ApiService, Feedback } from '../services/api.service';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-criar-feedback',
  templateUrl: './criar-feedback.page.html',
  styleUrls: ['./criar-feedback.page.scss'],
})
export class CriarFeedbackPage implements OnInit {

  @Input() feedbacks: Feedback[];
  public formulario: FormGroup;
  public imgForm: FormGroup;

  constructor(
    public modalController: ModalController,
    public formBuilder: FormBuilder,
    public photoService: PhotoService,
    public toastController: ToastController,
    public apiService: ApiService
  ) {
    this.formulario = this.formBuilder.group({
      titulo: ['', [Validators.required, Validators.minLength(3)]],
      mensagem: ['', [Validators.required, Validators.minLength(3)]],
      tipo: [0, [Validators.required, Validators.min(0), Validators.max(2)]],
    });

    this.imgForm = this.formBuilder.group({
      url: ['', Validators.required]
    });
  }

  async toast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
    });

    await toast.present();
  }

  async cadastrar() {
    if (this.formulario.valid) {
      this.feedbacks.unshift(this.formulario.value);

      const feedback: Feedback = {
        ...this.formulario.value,
        images: [this.imgForm.value],
        usuario: 1
      };

      console.log('Feedback', feedback);
      const response = await this.apiService.uploadPostagem(feedback);

      if (!response) {
        this.toast('Ocorreu um problema ao cadastrar')
      }

      this.dismiss();
    } else {
      this.toast('Preencha corretamente os campos');
      this.formulario.markAllAsTouched();
      this.imgForm.markAllAsTouched();
    }
  }

  dismiss() {
    this.modalController.dismiss();
  }

  async adicionarFoto() {
    await this.photoService.addNewToGallery();
    const photo = this.photoService.photos[0];
    // console.log('Photo', photo);

    this.imgForm.controls.url.setValue(photo.webViewPath);
    // console.log(this.imgForm.get('url').value);

    // console.log(this.photoService.photos);

  }

  ngOnInit() {
  }

}
