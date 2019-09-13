import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwinhomeComponent } from './twinhome.component';

describe('TwinhomeComponent', () => {
  let component: TwinhomeComponent;
  let fixture: ComponentFixture<TwinhomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwinhomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwinhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
