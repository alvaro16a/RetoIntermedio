import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestionComponent } from './requestion.component';

describe('RequestionComponent', () => {
  let component: RequestionComponent;
  let fixture: ComponentFixture<RequestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
