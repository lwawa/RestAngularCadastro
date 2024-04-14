import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadstroEnderecoComponent } from './cadstro-endereco.component';

describe('CadstroEnderecoComponent', () => {
  let component: CadstroEnderecoComponent;
  let fixture: ComponentFixture<CadstroEnderecoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadstroEnderecoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadstroEnderecoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
