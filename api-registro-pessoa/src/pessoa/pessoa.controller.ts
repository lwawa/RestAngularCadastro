import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { Pessoa } from './pessoa.model';
import { PessoaService } from './pessoa.service';

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
  updatePessoa(@Param('id') id: string, @Body() pessoaData: Pessoa): Pessoa {
    return this.pessoaService.updatePessoa(id, pessoaData);
  }

  @Delete(':id')
  deletePessoa(@Param('id') id: string): Pessoa {
    return this.pessoaService.deletePessoa(id);
  }

}
