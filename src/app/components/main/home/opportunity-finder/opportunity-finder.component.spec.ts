import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunityFinderComponent } from './opportunity-finder.component';

describe('OpportunityFinderComponent', () => {
  let component: OpportunityFinderComponent;
  let fixture: ComponentFixture<OpportunityFinderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpportunityFinderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpportunityFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
