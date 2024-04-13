import { Controller, Get, Post, Put, Delete, Body, Param, Patch } from '@nestjs/common';
import { Pessoa } from './pessoa.model';
import { PessoaService } from './pessoa.service';
import { Endereco } from 'src/endereco/endereco.model';

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

  @Patch(':id/endereco/:enderecoIndex')
  async updateEnderecoPessoa(
    @Param('id') id: string,
    @Param('enderecoIndex') enderecoIndex: string,
    @Body() enderecoData: Partial<Endereco>
  ): Promise<Pessoa> {
    const parsedEnderecoIndex = parseInt(enderecoIndex, 10);
    return this.pessoaService.updateEnderecoPessoa(id, parsedEnderecoIndex, enderecoData);
  }

  @Patch(':id/add-endereco')
  async addEnderecoToPessoa(
    @Param('id') id: string,
    @Body() novoEndereco: Endereco
  ): Promise<Pessoa> {
    return this.pessoaService.addEnderecoToPessoa(id, novoEndereco);
  }
}
