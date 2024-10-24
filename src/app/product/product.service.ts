import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable, throwError } from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  entityUrl = environment.REST_API_URL + 'products';

  private productsSubject: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  public products$: Observable<Product[]> = this.productsSubject.asObservable();

  constructor(private http: HttpClient) {
   
  }

  getProducts(): void {
    this.http.get<Product[]>(this.entityUrl).subscribe(products => {
      this.productsSubject.next(products);
    });
  }


  getProduct(id: string) : Observable<Product> {
    return this.http.get<Product>(this.entityUrl+"/"+id);
  }

  addProduct(product: Product) : void {
  
    this.http.post<Product>(this.entityUrl, product).subscribe(() => {
      this.getProducts(); // Aktualisieren Sie die Produktliste nach dem Hinzufügen
    });
  }

  deleteProduct(id: Number): void {
      this.http.delete<Product>(this.entityUrl+"/"+id).subscribe(() => {
      this.getProducts(); 
      });
  }

  updateProduct(id: string, updatedProduct: Product) : void {
    this.http.put<Product>(this.entityUrl+"/"+id, updatedProduct).subscribe(() => {
      this.getProducts(); // Aktualisieren Sie die Produktliste nach dem Bearbeiten
    });
  }

  private handleError(error: HttpErrorResponse) {
    // Fehlerlogik hier anpassen, z.B. Nachrichten an den User
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
