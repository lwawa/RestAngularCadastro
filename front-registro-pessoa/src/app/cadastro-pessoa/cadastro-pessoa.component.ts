import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pessoa } from '../models/pessoa.model';
import { PessoaService } from '../services/api.service';


@Component({
  selector: 'app-cadastro-pessoa',
  templateUrl: './cadastro-pessoa.component.html',
  styleUrls: ['./cadastro-pessoa.component.css']
})
export class CadastroPessoaComponent implements OnInit {
  pessoa: Pessoa = new Pessoa();

  constructor(private pessoaService: PessoaService, private router: Router) { }

  ngOnInit(): void {
    this.pessoa.enderecos = [];
  }

  onSubmit() {
    this.pessoaService.createPessoa(this.pessoa).subscribe(() => {
      console.log('Pessoa cadastrada com sucesso.');
      this.router.navigate(['/']);
    }, error => {
      console.error('Erro ao cadastrar pessoa:', error);
    });
  }

}
