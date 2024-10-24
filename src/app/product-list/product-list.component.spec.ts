import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductListComponent } from './product-list.component';
import { ProductService } from '../product/product.service';
import { HttpClient } from '@angular/common/http';

describe('ProductListComponent', () => {
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductListComponent],
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    }).compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(ProductListComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should make an HTTP GET request', () => {
    const testData = { name: 'Test Product' };

    const productService = TestBed.inject(ProductService);
    spyOn(productService, 'getProducts').and.returnValue(of(testData));

    const fixture = TestBed.createComponent(ProductListComponent);
    fixture.detectChanges();

    expect(productService.getProducts).toHaveBeenCalled();
  });

});