import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnderecosComponent } from './enderecos/enderecos.component';
import { PessoasComponent } from './pessoas/pessoas.component';
import { CadastroPessoaComponent } from './cadastro-pessoa/cadastro-pessoa.component';
import { CadstroEnderecoComponent } from './cadstro-endereco/cadstro-endereco.component';

const routes: Routes = [
  { path: '', component: PessoasComponent },
  { path: 'enderecos/:pessoaId', component: EnderecosComponent },
  { path: 'cadastro', component: CadastroPessoaComponent},
  { path: 'cadastro/:pessoaId', component: CadastroPessoaComponent},
  { path: 'enderecos/:pessoaId/cadastrar', component: CadstroEnderecoComponent},
  { path: 'enderecos/:pessoaId/cadastrar/:enderecoId', component: CadstroEnderecoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
