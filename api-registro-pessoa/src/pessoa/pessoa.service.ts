import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Pessoa } from './pessoa.model';
import { Endereco } from '../endereco/endereco.model';
import { validate } from 'class-validator';

@Injectable()
export class PessoaService {
  private pessoas: Pessoa[] = [];

  getAllPessoas(): Pessoa[] {
    return this.pessoas;
  }

  getPessoaById(id: string): Pessoa {
    const pessoa = this.pessoas.find(p => p.id === id);
    if (!pessoa) {
      throw new NotFoundException('Pessoa não encontrada.');
    }
    return pessoa;
  }

  async createPessoa(pessoaData: Pessoa): Promise<Pessoa> {
    const novaPessoa = { id: (this.pessoas.length + 1).toString(), ...pessoaData };

    const errors = await validate(novaPessoa);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    this.pessoas.push(novaPessoa);
    return novaPessoa;
  }

  updatePessoa(id: string, pessoaData: Partial<Pessoa>): Pessoa {
    const pessoaIndex = this.pessoas.findIndex(p => p.id === id);
    if (pessoaIndex === -1) {
      throw new NotFoundException('Pessoa não encontrada.');
    }
    const pessoaAtualizada = { ...this.pessoas[pessoaIndex], ...pessoaData };
    this.pessoas[pessoaIndex] = pessoaAtualizada;
    return pessoaAtualizada;
  }

  updateEnderecoPessoa(id: string, enderecoIndex: number, enderecoData: Partial<Endereco>): Pessoa {
    const pessoaIndex = this.pessoas.findIndex(p => p.id === id);
    if (pessoaIndex === -1) {
      throw new NotFoundException('Pessoa não encontrada.');
    }

    const pessoa = this.pessoas[pessoaIndex];
    if (!pessoa.enderecos || enderecoIndex >= pessoa.enderecos.length || enderecoIndex < 0) {
      throw new NotFoundException('Endereço não encontrado.');
    }

    const enderecoAtualizado = { ...pessoa.enderecos[enderecoIndex], ...enderecoData };
    pessoa.enderecos[enderecoIndex] = enderecoAtualizado;

    return pessoa;
  }

  deletePessoa(id: string): Pessoa {
    const pessoaIndex = this.pessoas.findIndex(p => p.id === id);
    if (pessoaIndex === -1) {
      throw new NotFoundException('Pessoa não encontrada.');
    }
    const pessoaExcluida = this.pessoas.splice(pessoaIndex, 1)[0];
    return pessoaExcluida;
  }
}
