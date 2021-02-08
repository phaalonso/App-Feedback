import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { Feedback } from '../home/home.page';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-criar-feedback',
  templateUrl: './criar-feedback.page.html',
  styleUrls: ['./criar-feedback.page.scss'],
})
export class CriarFeedbackPage implements OnInit {

  @Input() feedbacks: Feedback[];
  public formulario: FormGroup;

  constructor(
    public modalController: ModalController,
    public formBuilder: FormBuilder,
    public photoService: PhotoService,
    public toastController: ToastController
  ) {
    this.formulario = this.formBuilder.group({
      title: ["", [Validators.required, Validators.minLength(3)]],
      message: ["", [Validators.required, Validators.minLength(3)]],
      type: [0, [Validators.required, Validators.min(0), Validators.max(2)]],
      photo_path: ["", [Validators.required]]
    })
  }

  async toastFormularioInvalido() {
    const toast = await this.toastController.create({
      message: 'Preencha corretatente os campos!',
      duration: 2000,
    });

    await toast.present();
  }

  cadastrar() {
    console.log('Cadastrar');
    console.log(this.formulario.value);
    
    if (this.formulario.valid) {
      this.feedbacks.unshift(this.formulario.value);
      
      this.dismiss();
    } else {
      this.toastFormularioInvalido();
      this.formulario.markAllAsTouched();
    }
  }

  dismiss() {
    this.modalController.dismiss();
  }

  async adicionarFoto() {
    await this.photoService.addNewToGallery();
    const photo = this.photoService.photos[0];
    console.log(photo);
        
    const photo_url = `${photo.webViewPath}.${photo.format}`;

    this.formulario.controls['photo_path'].setValue(photo_url);
    console.log(this.formulario.value);
  }

  ngOnInit() {
  }

}