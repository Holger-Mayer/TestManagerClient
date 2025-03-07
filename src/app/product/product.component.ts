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

    this.id = Number(this.route.snapshot.paramMap.get('id'));

    if (this.id) {
      // Versuche, Daten aus LocalStorage zu laden
      const storedModel = localStorage.getItem('currentModel');
      if (storedModel) {
        this.selectedProduct = JSON.parse(storedModel);
      } else {
        // Falls keine Daten im LocalStorage, lade sie aus der API
        this.loadModel(this.id);
      }

      if (this.selectedProduct != null) {
        this.productName = this.selectedProduct.name;
        this.productDescription = this.selectedProduct.description;
      } 
    
    }
  }


  private loadModel(id: number): void {
      // Service fragt das Modell basierend auf der ID ab
      this.productService.getProduct(id).subscribe(data => {
        this.selectedProduct = data;
  
        // Optional: Daten im LocalStorage speichern
        localStorage.setItem('currentModel', JSON.stringify(data));
      });
  }
  
}
