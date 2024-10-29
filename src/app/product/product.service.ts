import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  entityUrl = environment.REST_API_URL + 'products';

  private productsSubject: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  public products$: Observable<Product[]> = this.productsSubject.asObservable();

  private selectedProductSubject = new BehaviorSubject<Product | null>(null);
  selectedProduct$ = this.selectedProductSubject.asObservable();

  constructor(private http: HttpClient) {

  }

  getProducts(): void {
    this.http.get<Product[]>(this.entityUrl).subscribe(products => {
      this.productsSubject.next(products);
    });
  }

  getProductsPaged(page: number, size: number): Observable<any> {

   return this.http.get<any>(`${this.entityUrl}/paged?page=${page}&size=${size}`);
   
  }


  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(this.entityUrl + "/" + id);
  }

  addProduct(product: Product):  Observable<Product> {

    return this.http.post<Product>(this.entityUrl, product)
  }

  deleteProduct(id: Number) : Observable<void> {
    return this.http.delete<void>(this.entityUrl + "/" + id);
  }

  updateProduct(id: number, updatedProduct: Product):  Observable<Product>{
    return this.http.put<Product>(this.entityUrl + "/" + id, updatedProduct);
  }


  setSelectedProduct(id: Number) {

    let product = this.productsSubject.value.find(p => p.id === id) || null;
    this.selectedProductSubject.next(product);
  }
}
