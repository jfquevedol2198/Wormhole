import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCodemirrorComponent } from './my-codemirror.component';

describe('MyCodemirrorComponent', () => {
  let component: MyCodemirrorComponent;
  let fixture: ComponentFixture<MyCodemirrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyCodemirrorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCodemirrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
