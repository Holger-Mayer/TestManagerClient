import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../product/product.service';
import { Product } from '../product/product';
import { ProductAddEditComponent } from '../product-addedit/product-addedit.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})


export class ProductListComponent implements OnInit {

  constructor(private productService: ProductService,
    private dialog: MatDialog,
    private router: Router) { }


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource = new MatTableDataSource<Product>();
  pageSize = 10;
  pageIndex = 0;
  totalItems = 0;

  displayedColumns: string[] = ['name', 'actions'];


  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {

    this.productService.getProductsPaged(this.pageIndex, this.pageSize).subscribe(data => {
      this.dataSource.data = data.content;
      this.totalItems = data.totalElements;
    });

  }

  onPageChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadProducts();
  }


  addProduct() {
    this.router.navigate(['/newProduct']);

  }

  openDialog(item?: Product): void {
    const dialogRef = this.dialog.open(ProductAddEditComponent, {
      width: '550px',
      data: item ? { ...item } : { name: '' }  // Falls kein Item übergeben wird, ist es ein neuer Eintrag
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (item) {
          this.productService.updateProduct(item.id, result).subscribe(() => this.loadProducts());
        } else {
          this.productService.addProduct(result).subscribe(() => this.loadProducts());
        }
      }
    });
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe(() => this.loadProducts());
  }


  openProductDashboard(product:Product) {
;
    this.productService.setSelectedProduct(product);

    this.router.navigate(['/dashboard', product.id]);


  }
}