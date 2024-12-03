import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetreminderComponent } from './setreminder.component';

describe('SetreminderComponent', () => {
  let component: SetreminderComponent;
  let fixture: ComponentFixture<SetreminderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetreminderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetreminderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
