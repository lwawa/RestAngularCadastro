import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnderecosComponent } from './enderecos/enderecos.component';
import { PessoasComponent } from './pessoas/pessoas.component';
import { CadastroPessoaComponent } from './cadastro-pessoa/cadastro-pessoa.component';

const routes: Routes = [
  { path: '', component: PessoasComponent },
  { path: 'enderecos/:pessoaId', component: EnderecosComponent },
  { path: 'cadastro', component: CadastroPessoaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
