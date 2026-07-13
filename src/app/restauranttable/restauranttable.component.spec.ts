import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestauranttableComponent } from './restauranttable.component';

describe('RestauranttableComponent', () => {
  let component: RestauranttableComponent;
  let fixture: ComponentFixture<RestauranttableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestauranttableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestauranttableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
