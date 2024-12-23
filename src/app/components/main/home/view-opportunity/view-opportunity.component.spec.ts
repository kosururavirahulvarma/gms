import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOpportunityComponent } from './view-opportunity.component';

describe('ViewOpportunityComponent', () => {
  let component: ViewOpportunityComponent;
  let fixture: ComponentFixture<ViewOpportunityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewOpportunityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewOpportunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
