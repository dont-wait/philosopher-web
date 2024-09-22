import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhilosophersComponent } from './philosophers.component';

describe('PhilosophersComponent', () => {
  let component: PhilosophersComponent;
  let fixture: ComponentFixture<PhilosophersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PhilosophersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhilosophersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
