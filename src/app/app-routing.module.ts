import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductAddEditComponent } from './product-addedit/product-addedit.component';
import { ProductComponent } from './product/product.component';


const routes: Routes = [
  {path: '', component: ProductListComponent},
  {path:"newProduct" , component:ProductAddEditComponent},
  {path:"editProduct/:id" , component:ProductAddEditComponent},
  {path:"dashboard" , component:ProductComponent},
  

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
