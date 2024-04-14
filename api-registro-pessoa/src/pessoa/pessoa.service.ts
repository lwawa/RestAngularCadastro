import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Pessoa } from './pessoa.model';
import { Endereco } from '../endereco/endereco.model';
import { validate } from 'class-validator';

@Injectable()
export class PessoaService {
  private pessoas: Pessoa[] = [];
  private ultimoId: number = 0;
  private enderecoId: number = 0;

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
    const novaPessoa = { id: (++this.ultimoId).toString(), ...pessoaData };
    if(novaPessoa.enderecos.length > 0){
      for (const endreco of novaPessoa.enderecos){
        endreco.id = (++this.enderecoId).toString()
      }
    }
    const errors = await validate(novaPessoa);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    this.pessoas.push(novaPessoa);
    return novaPessoa;
  }

  async updatePessoa(id: string, pessoaData: Partial<Pessoa>): Promise<Pessoa> {
    const pessoaIndex = this.pessoas.findIndex(p => p.id === id);

    if(pessoaData.enderecos){
      if(pessoaData.enderecos.length > 0){
        for (const endreco of pessoaData.enderecos){
          endreco.id = (++this.enderecoId).toString()
        }
      }
    }
    if (pessoaIndex === -1) {
      throw new NotFoundException('Pessoa não encontrada.');
    }

    const pessoaAtualizada = { ...this.pessoas[pessoaIndex], ...pessoaData };
    
    const errors = await validate(pessoaAtualizada);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    this.pessoas[pessoaIndex] = pessoaAtualizada;

    return pessoaAtualizada;
  }


  deletePessoa(id: string): Pessoa {
    const pessoaIndex = this.pessoas.findIndex(p => p.id === id);
    if (pessoaIndex === -1) {
      throw new NotFoundException('Pessoa não encontrada.');
    }
    const pessoaExcluida = this.pessoas.splice(pessoaIndex, 1)[0];
    return pessoaExcluida;
  }

  getEnderecoById(pessoaId: string, enderecoId: string): Endereco {
    const pessoa = this.pessoas.find(p => p.id === pessoaId);
    if (!pessoa) {
      throw new NotFoundException('Pessoa não encontrada.');
    }
    const endereco = pessoa.enderecos.find(e => e.id === enderecoId);
    if (!endereco) {
      throw new NotFoundException('Endereço não encontrado.');
    }
    return endereco;
  }

  async updateEnderecoPessoa(pessoaId: string, enderecoId: string, enderecoData: Partial<Endereco>): Promise<Pessoa> {
    const pessoaIndex = this.pessoas.findIndex(p => p.id === pessoaId);
    if (pessoaIndex === -1) {
      throw new NotFoundException('Pessoa não encontrada.');
    }
    const pessoa = this.pessoas[pessoaIndex];
    const enderecoIndex = pessoa.enderecos.findIndex(e => e.id === enderecoId);
    if (enderecoIndex === -1) {
      throw new NotFoundException('Endereço não encontrado.');
    }
    const enderecoAtualizado = { ...pessoa.enderecos[enderecoIndex], ...enderecoData };

    const errors = await validate(enderecoAtualizado);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }
    pessoa.enderecos[enderecoIndex] = enderecoAtualizado;
    return pessoa;
  }

  async addEnderecoToPessoa(pessoaId: string, novoEndereco: Endereco): Promise<Pessoa> {
    const pessoa = this.getPessoaById(pessoaId);
    
    const errors = await validate(novoEndereco);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    novoEndereco.id = (++this.enderecoId).toString();
    pessoa.enderecos.push(novoEndereco);

    return pessoa;
  }

  async deleteEnderecoFromPessoa(pessoaId: string, enderecoId: string): Promise<Pessoa> {
    const pessoaIndex = this.pessoas.findIndex(p => p.id === pessoaId);
    if (pessoaIndex === -1) {
      throw new NotFoundException('Pessoa não encontrada.');
    }
    const pessoa = this.pessoas[pessoaIndex];
    const enderecoIndex = pessoa.enderecos.findIndex(e => e.id === enderecoId);

    if (!pessoa.enderecos || enderecoIndex < 0) {
      throw new NotFoundException('Endereço não encontrado.');
    }

    pessoa.enderecos.splice(enderecoIndex, 1);

    return pessoa;
}

}
