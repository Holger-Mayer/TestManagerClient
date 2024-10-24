import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HelloWorldComponent } from './hello-world.component';
import { HttpClient } from '@angular/common/http';

describe('HelloWorldComponent', () => {
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HelloWorldComponent],
      imports: [HttpClientTestingModule],
    }).compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(HelloWorldComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should make an HTTP GET request', () => {
    const testData = { name: 'Test Data' };

    httpClient.get('/data').subscribe(data =>
      expect(data).toEqual(testData)
    );

    const req = httpTestingController.expectOne('/data');
    expect(req.request.method).toEqual('GET');
    req.flush(testData);

    httpTestingController.verify();
  });

});