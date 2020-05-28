import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManteniminetoPersonaComponent } from './mantenimineto-persona.component';

describe('ManteniminetoPersonaComponent', () => {
  let component: ManteniminetoPersonaComponent;
  let fixture: ComponentFixture<ManteniminetoPersonaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManteniminetoPersonaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManteniminetoPersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
