import { Controller, Get, Post, Put, Delete, Body, Param, Patch } from '@nestjs/common';
import { Pessoa } from './pessoa.model';
import { PessoaService } from './pessoa.service';
import { Endereco } from '../endereco/endereco.model';
import { get } from 'http';

@Controller('pessoa')
export class PessoaController {
  constructor(private readonly pessoaService: PessoaService) {}

  @Get()
  getAllPessoas(): Pessoa[] {
    return this.pessoaService.getAllPessoas();
  }

  @Get(':id')
  getPessoaById(@Param('id') id: string): Pessoa {
    return this.pessoaService.getPessoaById(id);
  }

  @Post()
  async createPessoa(@Body() pessoaData: Pessoa): Promise<Pessoa> {
    return this.pessoaService.createPessoa(pessoaData);
  }

  @Put(':id')
  async updatePessoa(
    @Param('id') id: string,
    @Body() pessoaData: Partial<Pessoa>
  ): Promise<Pessoa> {
    return this.pessoaService.updatePessoa(id, pessoaData);
  }

  @Delete(':id')
  deletePessoa(@Param('id') id: string): Pessoa {
    return this.pessoaService.deletePessoa(id);
  }

  @Get(':id/endereco/:enderecoId')
  getEnderecoById(@Param('id') id: string, @Param('enderecoId') enderecoId: string): Endereco {
    return this.pessoaService.getEnderecoById(id, enderecoId);
  }

  @Patch(':id/endereco/:enderecoId')
  async updateEnderecoPessoa(
    @Param('id') id: string,
    @Param('enderecoId') enderecoId: string,
    @Body() enderecoData: Partial<Endereco>
  ): Promise<Pessoa> {
    return this.pessoaService.updateEnderecoPessoa(id, enderecoId, enderecoData);
  }

  @Patch(':id/add-endereco')
  async addEnderecoToPessoa(
    @Param('id') id: string,
    @Body() novoEndereco: Endereco
  ): Promise<Pessoa> {
    return this.pessoaService.addEnderecoToPessoa(id, novoEndereco);
  }

  @Delete(':id/endereco/:enderecoId')
  deleteEnderecoFromPessoa(@Param('id') pessoaId: string, @Param('enderecoId') enderecoId: string): Promise<Pessoa> {
    return this.pessoaService.deleteEnderecoFromPessoa(pessoaId, enderecoId);
  }
}
