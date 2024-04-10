import { IsNotEmpty, IsString, IsPostalCode, IsOptional, IsNumber } from 'class-validator';

export class Endereco {
  @IsNotEmpty()
  @IsString()
  endereco: string;

  @IsNotEmpty()
  @IsNumber()
  numero: number;

  @IsOptional()
  @IsString()
  complemento?: string;

  @IsNotEmpty()
  @IsString()
  bairro: string;

  @IsNotEmpty()
  @IsString()
  cidade: string;

  @IsNotEmpty()
  @IsString()
  estado: string;

  @IsNotEmpty()
  @IsPostalCode('BR')
  cep: string;
}
