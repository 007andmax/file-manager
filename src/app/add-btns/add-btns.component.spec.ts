import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBtnsComponent } from './add-btns.component';

describe('AddBtnsComponent', () => {
  let component: AddBtnsComponent;
  let fixture: ComponentFixture<AddBtnsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBtnsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBtnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
