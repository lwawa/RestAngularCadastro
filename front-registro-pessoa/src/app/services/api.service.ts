import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pessoa } from '../models/pessoa.model';
import { Endereco } from '../models/endereco.model';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {
  private apiUrl = 'http://localhost:3000/pessoa';

  constructor(private http: HttpClient) { }

  getAllPessoas(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(this.apiUrl);
  }

  getPessoaById(id: string): Observable<Pessoa> {
    return this.http.get<Pessoa>(`${this.apiUrl}/${id}`);
  }

  createPessoa(pessoaData: Pessoa): Observable<Pessoa> {
    return this.http.post<Pessoa>(this.apiUrl, pessoaData);
  }

  updatePessoa(id: string, pessoaData: Partial<Pessoa>): Observable<Pessoa> {
    return this.http.put<Pessoa>(`${this.apiUrl}/${id}`, pessoaData);
  }

  deletePessoa(id: string): Observable<Pessoa> {
    return this.http.delete<Pessoa>(`${this.apiUrl}/${id}`);
  }

  addEnderecoPessoa(id: string, enderecoData: Partial<Endereco>): Observable<Pessoa> {
    return this.http.patch<Pessoa>(`${this.apiUrl}/${id}/add-endereco`, enderecoData);
  }

  getEnderecoPessoa(id: string, enderecoId: string): Observable<Endereco> {
    return this.http.get<Endereco>(`${this.apiUrl}/${id}/endereco/${enderecoId}`);
  }

  updateEnderecoPessoa(id: string, enderecoId: string, enderecoData: Partial<Endereco>): Observable<Pessoa> {
    return this.http.patch<Pessoa>(`${this.apiUrl}/${id}/endereco/${enderecoId}`, enderecoData);
  }

  deleteEnderecoPessoa(id: string, enderecoId: string): Observable<Pessoa> {
    return this.http.delete<Pessoa>(`${this.apiUrl}/${id}/endereco/${enderecoId}`);
  }
}
