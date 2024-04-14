import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pessoa } from '../models/pessoa.model';
import { PessoaService } from '../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalDetalhesPessoaComponent } from '../modal-detalhes-pessoa/modal-detalhes-pessoa.component';


@Component({
  selector: 'app-cadastro-pessoa',
  templateUrl: './cadastro-pessoa.component.html',
  styleUrls: ['./cadastro-pessoa.component.css']
})
export class CadastroPessoaComponent implements OnInit {
  pessoa: Pessoa = new Pessoa();
  isCriacao: boolean = true;
  pessoaId: string = "";

  constructor(private pessoaService: PessoaService, private Activeroute: ActivatedRoute , public dialog: MatDialog ) { }

  ngOnInit(): void {
    this.Activeroute.paramMap.subscribe(params => {
      const pessoaId = params.get('pessoaId');
      if (pessoaId) {
        this.carregarEnderecos(pessoaId);
        this.isCriacao = false;
        this.pessoaId = pessoaId
      } else {
        this.isCriacao = true;
      }
    });
    this.pessoa.enderecos = [];
  }

  carregarEnderecos(pessoaId: string): void {
    this.pessoaService.getPessoaById(pessoaId).subscribe(
      (pessoa) => {
        if(pessoa)
          this.pessoa = pessoa;
      },
      error => {
        console.log('Erro ao carregar endereços:', error);
      }
    );
  }

  onSubmit() {
    if(this.isCriacao){
      this.pessoaService.createPessoa(this.pessoa).subscribe(() => {
        console.log('Pessoa cadastrada com sucesso.');
        this.openModal();
      }, error => {
        console.error('Erro ao cadastrar pessoa:', error);
      });
    }else{
      this.pessoaService.updatePessoa(this.pessoaId, this.pessoa).subscribe(()=>{
        console.log('Pessoa atualizada com sucesso.');
        this.openModal();
      } , error =>{
        console.error('Erro ao atualizada pessoa:', error);
      });
    }
    
  }

  openModal(): void {
    const dialogRef = this.dialog.open(ModalDetalhesPessoaComponent, {
      data: { pessoa: this.pessoa }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('O modal foi fechado.');
    });
  }
}
