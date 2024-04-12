import { Endereco } from './endereco.model';

export class Pessoa {
  id?: string;
  nome: string = '';
  sexo: string = '';
  dataNascimento: Date = new Date;
  estadoCivil: string = '';
  enderecos: Endereco[] = [];
}
