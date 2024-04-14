import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PessoaService } from '../services/api.service';
import { Endereco } from '../models/endereco.model';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

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

  constructor(private pessoaService: PessoaService, private Activeroute: ActivatedRoute, private router: Router , private http: HttpClient ) { }

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
        this.isCriacao = true;
        this.pessoaId = pessoaId
      }else{
        console.log('erro ao carregar, id pessoa invalido')
      }
    });
  }

  onCEPChange(cep: string): string {
    if (this.endereco.cep.length === 8 || this.endereco.cep.length === 9 ) {
      this.buscarEnderecoPorCEP(this.endereco.cep);
    }else{
      this.endereco.cidade = "";
      this.endereco.estado = "";
    }
    cep = cep.replace(/\D/g, '');
    cep = cep.replace(/^(\d{5})(\d{3})$/, '$1-$2');
    
    return cep;
  }

  buscarEnderecoPorCEP(cep: string): void {
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    this.http.get<any>(url).subscribe(
      (data) => {
        if (!data.erro) {
          this.endereco.cidade = data.localidade;
          this.endereco.estado = data.uf;
        }else{
          this.endereco.cidade = '';
          this.endereco.estado = ''
        }
      },
      error => {
        console.log('Erro ao buscar endereço por CEP:', error);
      }
    );
  }

  carregarEnderecos(pessoaId: string, enderecoId: string): void {
    this.pessoaService.getEnderecoPessoa(pessoaId, enderecoId).subscribe(
      (endereco) => {
        if(endereco)
          this.endereco = endereco;
      },
      error => {
        console.log('Erro ao carregar endereços:', error);
      }
    );
  }

  
  

  onSubmit() {
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