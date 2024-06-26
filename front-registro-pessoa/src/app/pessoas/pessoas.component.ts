import { Component, OnInit } from '@angular/core';
import { PessoaService } from '../services/api.service';
import { Pessoa } from '../models/pessoa.model';

@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoas.component.html',
  styleUrls: ['./pessoas.component.css']
})
export class PessoasComponent implements OnInit {
  pessoas: Pessoa[] = [];
  jsonData: string = '';


  constructor(private pessoaService: PessoaService) {}

  ngOnInit() {
    this.getPessoas();
  }

  getPessoas() {
    this.pessoaService.getAllPessoas().subscribe(
      (data: Pessoa[]) => {
        this.pessoas = data;
        this.jsonData = JSON.stringify(data);
      },
      error => {
        console.log('Erro ao obter pessoas:', error);
      }
    );
  }


  deletePessoa(id: string) {
    if (confirm('Tem certeza de que deseja excluir esta pessoa?')) {
      this.pessoaService.deletePessoa(id).subscribe(
        () => {
          this.getPessoas();
          console.log('Pessoa excluída com sucesso.');
        },
        error => {
          console.log('Erro ao excluir pessoa:', error);
        }
      );
    }
  }

}
