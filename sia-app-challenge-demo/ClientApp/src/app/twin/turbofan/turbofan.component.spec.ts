import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurbofanComponent } from './turbofan.component';

describe('TurbofanComponent', () => {
  let component: TurbofanComponent;
  let fixture: ComponentFixture<TurbofanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurbofanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurbofanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
