import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from './product';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  selectedProduct: Product | null = null;
  productName: String = "";
  productDescription: String = ""

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.selectedProduct$.subscribe(product => {
      this.selectedProduct = product;
      if (product != null) {
        this.productName = product.name;
        this.productDescription = product.description;
      } 

    
    });

  }

}
