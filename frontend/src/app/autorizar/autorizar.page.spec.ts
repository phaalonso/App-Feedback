import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AutorizarPage } from './autorizar.page';

describe('AutorizarPage', () => {
  let component: AutorizarPage;
  let fixture: ComponentFixture<AutorizarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutorizarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AutorizarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
