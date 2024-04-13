import { Component, OnInit } from '@angular/core';
import { PessoaService } from './services/api.service';
import { Pessoa } from './models/pessoa.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'Pessoas API';

}

