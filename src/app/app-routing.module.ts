import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductAddEditComponent } from './product-addedit/product-addedit.component';

const routes: Routes = [
  {path: '', component: ProductListComponent},
  {path:"newProduct" , component:ProductAddEditComponent},
  {path:"editProduct/:id" , component:ProductAddEditComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
