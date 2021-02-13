import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
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
    public apiService: ApiService
  ) { }

  ngOnInit() {
    // Redireciona, se o usuario não possuir permissão
    if (!this.autenticacaoService.isAdmin()) {
      this.router.navigate(['/home']);
    }
  }

}
