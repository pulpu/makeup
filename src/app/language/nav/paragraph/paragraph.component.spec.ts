import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParagraphComponent } from './paragraph.component'; //probabil e o gresala si trebuie sters

describe('ParagraphComponent', () => {
  let component: ParagraphComponent;
  let fixture: ComponentFixture<ParagraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParagraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParagraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
