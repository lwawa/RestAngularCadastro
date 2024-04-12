import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnderecosComponent } from './enderecos/enderecos.component';
import { AppComponent } from './app.component';
import { PessoasComponent } from './pessoas/pessoas.component';

const routes: Routes = [
  { path: '', component: PessoasComponent },
  { path: 'enderecos/:pessoaId', component: EnderecosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
