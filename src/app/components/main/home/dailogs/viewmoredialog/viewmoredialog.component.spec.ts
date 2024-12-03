import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewmoredialogComponent } from './viewmoredialog.component';

describe('ViewmoredialogComponent', () => {
  let component: ViewmoredialogComponent;
  let fixture: ComponentFixture<ViewmoredialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewmoredialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewmoredialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
