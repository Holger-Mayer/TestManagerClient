import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  constructor(private productService: ProductService,
    private router: Router) { }

  items: any[] = [];
  displayedColumns: string[] = ['name',  'actions'];
  ngOnInit(): void {
    this.productService.products$.subscribe(products => {
      this.items = products;
    });
    this.productService.getProducts(); // Initiales Laden der Produkte
  }

  


  addProduct() {
    this.router.navigate(['/newProduct']);
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id);
  }
}