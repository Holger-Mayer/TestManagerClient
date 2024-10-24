import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../product/product.service';
import { Product } from '../product/product';
import { Router, ActivatedRoute } from '@angular/router';
import { MatFormField,MatLabel } from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-product-addedit',
  templateUrl: './product-addedit.component.html',
  styleUrls: ['./product-addedit.component.css']
})
export class ProductAddEditComponent {

  productForm: FormGroup = new FormGroup({});
  formTitle: string = "Add Product";

  constructor(private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }


  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', [Validators.required, Validators.required]]
    });

    let id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id) {
    this.formTitle = "Edit Product";
      this.productService.getProduct(id).subscribe(product => {
        if (product) {
          this.productForm.patchValue(product);
        }
     });
  }

}
  onSubmit() {
    console.log("onSubmit:"+ this.productForm);

    if (this.productForm.valid) {
      console.log("onSubmit: valid");
      let product: Product = this.productForm.value;

      let id = this.activatedRoute.snapshot.paramMap.get('id');
      if (id) {
        this.productService.updateProduct(id,product);
      } else {
        this.productService.addProduct(product);
      }


      this.router.navigate(['/']);
    }
  }
}
