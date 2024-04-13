import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetalhesPessoaComponent } from './modal-detalhes-pessoa.component';

describe('ModalDetalhesPessoaComponent', () => {
  let component: ModalDetalhesPessoaComponent;
  let fixture: ComponentFixture<ModalDetalhesPessoaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDetalhesPessoaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalDetalhesPessoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
