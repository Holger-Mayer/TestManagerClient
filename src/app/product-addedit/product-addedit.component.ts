import { Component, OnInit ,Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../product/product.service';
import { Product } from '../product/product';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-product-addedit',
  templateUrl: './product-addedit.component.html',
  styleUrls: ['./product-addedit.component.css']
})
export class ProductAddEditComponent {

  productForm: FormGroup = new FormGroup({});
  formTitle: string = "Add Product";

  constructor(private dialogRef: MatDialogRef<ProductAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product,
    private formBuilder: FormBuilder,
    private productService: ProductService) { }


  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', [Validators.required, Validators.required]]
    });

    let id = this.data.id;

    if (id) {
    this.formTitle = "Edit Product";
      this.productService.getProduct(Number(id)).subscribe(product => {
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

      let id = this.data.id;
      if (id) {
        this.productService.updateProduct(Number(id),product);
      } else {
        this.productService.addProduct(product);
      }

      this.dialogRef.close(product);

    
    }

  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
