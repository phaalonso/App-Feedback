import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastController} from '@ionic/angular';
import {Usuario} from '../services/api.service';
import {AutenticacaoService} from '../services/autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public form: FormGroup;

  constructor(
    private formControl: FormBuilder,
    private autenticacaoService: AutenticacaoService,
    private toastController: ToastController,
    private router: Router
  ) {
    this.form = this.formControl.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]]
    });
  }

  public async login() {
    if (this.form.valid) {
      const usuario: Usuario = this.form.value;

      this.autenticacaoService.login(usuario).then(flag => {
        if (flag) {
          this.form.reset();
          this.router.navigate(['/home']);
        } else {
          this.showToast();
        }
      }).catch(err => {
        console.error(err);
        this.showToast();
      });
    } else {
      console.log('Errors', this.form.get('email').errors);
      this.form.markAllAsTouched();
    }
  }

  public async showToast() {
    const toast = await this.toastController.create({
      message: 'Não foi possível logar',
      duration: 2000
    });

    await toast.present();
  }

  ngOnInit() {
    this.autenticacaoService.isLogado().then(res => {
      if (res) {
        this.router.navigate(['/home']);
      }
    });
  }

}
