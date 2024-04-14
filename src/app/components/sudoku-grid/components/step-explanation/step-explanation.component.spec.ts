import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepExplanationComponent } from './step-explanation.component';

describe('StepExplanationComponent', () => {
  let component: StepExplanationComponent;
  let fixture: ComponentFixture<StepExplanationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepExplanationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StepExplanationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
