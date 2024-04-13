import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import  { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { EnderecosComponent } from './enderecos/enderecos.component';
import { PessoasComponent } from './pessoas/pessoas.component';
import { CadastroPessoaComponent } from './cadastro-pessoa/cadastro-pessoa.component';
import { ModalDetalhesPessoaComponent } from './modal-detalhes-pessoa/modal-detalhes-pessoa.component';

@NgModule({
  declarations: [
    AppComponent,
    EnderecosComponent,
    PessoasComponent,
    CadastroPessoaComponent,
    ModalDetalhesPessoaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    AppRoutingModule,
    FormsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent, PessoasComponent, EnderecosComponent]
})
export class AppModule { }
