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
  updatePessoa(@Param('id') id: string, @Body() pessoaData: Partial<Pessoa>): Pessoa {
    return this.pessoaService.updatePessoa(id, pessoaData);
  }

  @Patch(':id/endereco/:enderecoIndex')
  updateEnderecoPessoa(
    @Param('id') id: string,
    @Param('enderecoIndex') enderecoIndex: string,
    @Body() enderecoData: Partial<Endereco>
  ): Pessoa {
    const parsedEnderecoIndex = parseInt(enderecoIndex, 10);
    return this.pessoaService.updateEnderecoPessoa(id, parsedEnderecoIndex, enderecoData);
  }

  @Delete(':id')
  deletePessoa(@Param('id') id: string): Pessoa {
    return this.pessoaService.deletePessoa(id);
  }
}
