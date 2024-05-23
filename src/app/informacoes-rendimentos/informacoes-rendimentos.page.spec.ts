import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InformacoesRendimentosPage } from './informacoes-rendimentos.page';

describe('InformacoesRendimentosPage', () => {
  let component: InformacoesRendimentosPage;
  let fixture: ComponentFixture<InformacoesRendimentosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacoesRendimentosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
