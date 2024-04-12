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

  constructor(private route: ActivatedRoute, private pessoaService: PessoaService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const pessoaId = params.get('pessoaId');
      if (pessoaId) {
        this.carregarEnderecos(pessoaId);
      }
    });
  }

  carregarEnderecos(pessoaId: string): void {
    this.pessoaService.getPessoaById(pessoaId).subscribe(
      (pessoa) => {
        this.enderecos = pessoa.enderecos;
      },
      error => {
        console.log('Erro ao carregar endereços:', error);
      }
    );
  }
}
