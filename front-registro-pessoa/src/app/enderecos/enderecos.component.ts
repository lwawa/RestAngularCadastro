import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PessoaService } from '../services/api.service';
import { Endereco } from '../models/endereco.model';

@Component({
  selector: 'app-enderecos',
  templateUrl: './enderecos.component.html',
  styleUrls: ['./enderecos.component.css']
})
export class EnderecosComponent implements OnInit {
  enderecos: Endereco[] = [];
  pessoaId: string = ""

  constructor(private route: ActivatedRoute, private pessoaService: PessoaService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const pessoaId = params.get('pessoaId');
      if (pessoaId) {
        this.pessoaId = pessoaId;
        this.carregarEnderecos(pessoaId);
      }
    });
  }

  carregarEnderecos(pessoaId: string): void {
    this.pessoaService.getPessoaById(pessoaId).subscribe(
      (pessoa) => {
        if(pessoa.enderecos)
          this.enderecos = pessoa.enderecos;
        else{
          this.enderecos = []
        }
      },
      error => {
        console.log('Erro ao carregar endereços:', error);
      }
    );
  }

  deleteEndereco(id: string) {
    if (confirm('Tem certeza de que deseja excluir esta pessoa?')) {
      this.pessoaService.deleteEnderecoPessoa(this.pessoaId, id).subscribe(
        () => {
          console.log('Endereco excluído com sucesso.');
          window.location.reload();
        },
        error => {
          console.log('Erro ao excluir endereco:', error);
        }
      );
    }
  }
}
