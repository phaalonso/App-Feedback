import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AlertController, ToastController} from '@ionic/angular';
import {ApiService} from '../services/api.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  public form: FormGroup;

  constructor(
    private formControl: FormBuilder,
    private toastController: ToastController,
    private apiService: ApiService,
    private router: Router,
    private alertController: AlertController
  ) {
    this.form = this.formControl.group({
      nome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]],
      acessoLevel: [0, [Validators.required, Validators.min(0), Validators.max(1)]]
    });
  }

  private async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });

    await toast.present();
  }

  cadastrar() {
    if (this.form.invalid) {
      return this.showToast('Preencha o formulário corretamente!');
    }

    this.apiService.cadastrarUsuario(this.form.value).then(res => {
      this.alertController.create({
        message: 'Usuario cadastrado',
        buttons: [{
          text: 'Ok',
          handler: () => {
            this.router.navigate(['/login']);
          }
        }],
      }).then(alert => {
        alert.present()
      })
    }).catch(err => {
      console.error(err);
    });
  }

  ngOnInit() {
  }

}
