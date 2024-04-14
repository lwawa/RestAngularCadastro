import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pessoa } from '../models/pessoa.model';
import { PessoaService } from '../services/api.service';
import { Endereco } from '../models/endereco.model';
import { MatDialog } from '@angular/material/dialog';
import { ModalDetalhesPessoaComponent } from '../modal-detalhes-pessoa/modal-detalhes-pessoa.component';

@Component({
  selector: 'app-cadstro-endereco',
  templateUrl: './cadstro-endereco.component.html',
  styleUrls: ['./cadstro-endereco.component.css']
})
export class CadstroEnderecoComponent implements OnInit {

  endereco: Endereco = new Endereco();
  isCriacao: boolean = true;
  pessoaId: string = "";
  enderecoId: string = "";

  constructor(private pessoaService: PessoaService, private Activeroute: ActivatedRoute, private router: Router , public dialog: MatDialog ) { }

  ngOnInit(): void {
    this.Activeroute.paramMap.subscribe(params => {
      const pessoaId = params.get('pessoaId');
      const  enderecoId = params.get("enderecoId");
      if (pessoaId && enderecoId) {
        
        this.enderecoId = enderecoId;
        this.carregarEnderecos(pessoaId, enderecoId);
        this.isCriacao = false;
        this.pessoaId = pessoaId
      } else if(pessoaId){
        console.log(pessoaId)
        this.isCriacao = true;
        this.pessoaId = pessoaId
      }else{
        console.log('erro ao carregar, id pessoa invalido')
      }
    });
  }

  carregarEnderecos(pessoaId: string, enderecoId: string): void {
    this.pessoaService.getEnderecoPessoa(pessoaId, enderecoId).subscribe(
      (endereco) => {
        if(endereco)
          this.endereco = endereco;
          console.log(this.endereco)
      },
      error => {
        console.log('Erro ao carregar endereços:', error);
      }
    );
  }

  onSubmit() {
    console.log(this.endereco)
    if(this.isCriacao){
      this.pessoaService.addEnderecoPessoa(this.pessoaId, this.endereco).subscribe(() => {
        console.log('Endereço cadastrada com sucesso.');
        this.router.navigate(['/enderecos', this.pessoaId]);
      }, error => {
        console.error('Erro ao cadastrar endereço:', error);
      });
    }else{
      this.pessoaService.updateEnderecoPessoa(this.pessoaId, this.enderecoId, this.endereco).subscribe(()=>{
        console.log('Endereço atualizado com sucesso.');
        this.router.navigate(['/enderecos', this.pessoaId]);
      } , error =>{
        console.error('Erro ao atualizado endereço:', error);
      });
    }
  }
}
