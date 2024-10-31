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
    this.selectedProduct = this.productService.getSelectedProduct();

      if (this.selectedProduct != null) {
        this.productName = this.selectedProduct.name;
        this.productDescription = this.selectedProduct.description;
      } 

    
    }

}
