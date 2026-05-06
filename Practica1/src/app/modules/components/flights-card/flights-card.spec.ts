import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightsCard } from './flights-card';

describe('FlightsCard', () => {
  let component: FlightsCard;
  let fixture: ComponentFixture<FlightsCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightsCard],
    }).compileComponents();

    fixture = TestBed.createComponent(FlightsCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
