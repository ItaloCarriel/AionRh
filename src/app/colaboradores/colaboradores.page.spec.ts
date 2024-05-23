import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ColaboradoresPage } from './colaboradores.page';

describe('ColaboradoresPage', () => {
  let component: ColaboradoresPage;
  let fixture: ComponentFixture<ColaboradoresPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ColaboradoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
