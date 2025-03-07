import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductListComponent } from '../product-list/product-list.component';
import { ProductAddEditComponent } from '../product-addedit/product-addedit.component';
import { ProductService } from './product.service';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { ProductComponent } from './product.component';



@NgModule({
  declarations: [
    ProductListComponent,
    ProductAddEditComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule, 
    MatInputModule,  
    MatButtonModule, 
    MatTableModule, 
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatSortModule,
    MatProgressSpinnerModule

  ],
  providers: [
    ProductService
  ] 
})
export class ProductModule { }
