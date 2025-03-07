import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Product } from './product';
import { map } from 'rxjs/operators';



export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  entityUrl = environment.REST_API_URL + 'products';

  private productsSubject: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  public products$: Observable<Product[]> = this.productsSubject.asObservable();

  private selectedProduct : Product | null;

  constructor(private http: HttpClient) {
    this.selectedProduct = null;
  }

  getProducts(): void {
    this.http.get<Product[]>(this.entityUrl).subscribe(products => {
      this.productsSubject.next(products);
    });
  }

  getProductsPaged(page: number, size: number): Observable<any> {

   return this.http.get<any>(`${this.entityUrl}/paged?page=${page}&size=${size}`);
   
  }

  getProductsPagedSortedAndFiltered(
   filter = '', sortOrder = '',
    page = 0, size = 3):  Observable<PageResponse<Product>> {

      if (filter.length == 0) {
        let link =`${this.entityUrl}/paged-filtered?page=${page}&size=${size}&sortField=name&sortOrder=${sortOrder}`;
       console.log(link);
       return this.http.get<PageResponse<Product>>(link);
      } else {
        let link =`${this.entityUrl}/paged-filtered?filter=${filter}&page=${page}&size=${size}&sortField=name&sortOrder=${sortOrder}`;
      
        console.log(link);
        return this.http.get<PageResponse<Product>>(link);
      }

      // API : http://localhost:8080/api/products/paged-filtered?page=0&size=5&sortField=name&sortOrder=asc

    
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


  setSelectedProduct(product: Product) {

    console.log("Setting selected product to " + product.name);
    
    this.selectedProduct = product;

  }

  getSelectedProduct(): Product | null {
    if (this.selectedProduct == null) {
      console.error("No product selected");
    }
    return this.selectedProduct;
  }

}
