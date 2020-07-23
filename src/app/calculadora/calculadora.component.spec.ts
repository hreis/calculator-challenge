import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculadoraComponent } from './calculadora.component';

describe('CalculadoraComponent', () => {
  let component: CalculadoraComponent;
  let fixture: ComponentFixture<CalculadoraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculadoraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculadoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //

  it('should sum 2 numbers as string', () => {

    const res = component.calculate('10+22');

    expect(res).toEqual(32, 'deveria ser igual a 232');

  });

  it('should subtract', () => {

    const res = component.calculate('3-2');

    expect(res).toEqual(1, 'deveria ser igual a 1');

  });


  it('should multiply first and them subtract', () => {

    const res = component.calculate('5-2*2');

    expect(res).toEqual(1, 'deveria ser igual a 1');

  });


  it('should do work when trying to more then one multiply operators', () => {

    const res = component.calculate('5-2*2*2');

    expect(res).toEqual(-3, 'deveria ser igual a -3');

  });

  it('should divide', () => {

    const res = component.calculate('6/2');

    expect(res).toEqual(3, 'deveria ser igual a 3');

  });

  it('should divide first them multiply', () => {

    const res = component.calculate('6/2*4');

    expect(res).toEqual(12, 'deveria ser igual a ~12');

  });

   it('should do something awesome', () => {

    const res = component.calculate('5+5-6/2*4');

    expect(res).toEqual(-2, 'deveria ser igual a -2');

  });


  it('should multiply first them divide', () => {

    const res = component.calculate('6*2*4/2');

    expect(res).toEqual(24, 'deveria ser igual a 24');

  });


});
