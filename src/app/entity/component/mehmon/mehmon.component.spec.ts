import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MehmonComponent } from './mehmon.component';

describe('MehmonComponent', () => {
  let component: MehmonComponent;
  let fixture: ComponentFixture<MehmonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MehmonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MehmonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
