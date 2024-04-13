import { Component, Inject, OnInit, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Pessoa } from '../models/pessoa.model';

@Component({
  selector: 'app-modal-detalhes-pessoa',
  templateUrl: './modal-detalhes-pessoa.component.html',
  styleUrls: ['./modal-detalhes-pessoa.component.css']
})
export class ModalDetalhesPessoaComponent implements OnInit {
  @Input() pessoa: Pessoa = new Pessoa();
  
  constructor(
    public dialogRef: MatDialogRef<ModalDetalhesPessoaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  calcularIdade(dataNascimento: Date): number {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mesAtual = hoje.getMonth() + 1;
    const mesNascimento = nascimento.getMonth() + 1;

    if (mesAtual < mesNascimento || (mesAtual === mesNascimento && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }

    return idade;
  }

  isAniversario(dataNascimento: Date): boolean {
    const hoje = new Date();
    const nascimento = new Date (dataNascimento);
    return hoje.getMonth() === nascimento.getMonth() && hoje.getDate() === nascimento.getDate();
  }

  fecharModal(): void {
    this.dialogRef.close();
  }
}