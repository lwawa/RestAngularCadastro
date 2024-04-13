import { IsNotEmpty, IsString, IsDateString, IsIn, ValidateNested, ArrayNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { Endereco } from '../endereco/endereco.model';

export class Pessoa {
  id: string;

  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(['Masculino', 'Feminino', 'Outro'])
  sexo: string;

  @IsNotEmpty()
  @IsDateString()
  dataNascimento: Date;

  @IsNotEmpty()
  @IsString()
  @IsIn(['Solteiro(a)', 'Casado(a)', 'Separado(a)' , 'Divorciado(a)', 'Viúvo(a)'])
  estadoCivil: string;

  @ValidateNested({ each: true })
  @Type(() => Endereco)
  enderecos: Endereco[];
}
