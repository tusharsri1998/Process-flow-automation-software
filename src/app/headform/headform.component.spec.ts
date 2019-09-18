import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadformComponent } from './headform.component';

describe('HeadformComponent', () => {
  let component: HeadformComponent;
  let fixture: ComponentFixture<HeadformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeadformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
