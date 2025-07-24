import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarVendasComponent } from './consultar-vendas.component';

describe('ConsultarVendasComponent', () => {
  let component: ConsultarVendasComponent;
  let fixture: ComponentFixture<ConsultarVendasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultarVendasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsultarVendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
