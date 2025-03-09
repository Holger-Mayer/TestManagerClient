import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from './product';
import {MatSidenavModule} from '@angular/material/sidenav';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  id : number = 0;
  selectedProduct: Product | null = null;
  productName: String = "";
  productDescription: String = ""

  constructor(private route: ActivatedRoute,private productService: ProductService) { }

  ngOnInit() {

    this.id = 0
  
    const storedObject = localStorage.getItem('selectedProduct');
    if (storedObject != null ) {
      this.selectedProduct = JSON.parse(storedObject);

    if (this.selectedProduct != null) {
        this.id = this.selectedProduct.id;
        this.productName = this.selectedProduct.name;
        this.productDescription = this.selectedProduct.description;
      } 
    
    } else {
      this.productName = "No product selected";
      this.productDescription = "No product selected";
    }
  }
  
}
