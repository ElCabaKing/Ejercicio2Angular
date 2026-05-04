import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Departament } from './departament';

describe('Departament', () => {
  let component: Departament;
  let fixture: ComponentFixture<Departament>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Departament],
    }).compileComponents();

    fixture = TestBed.createComponent(Departament);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
