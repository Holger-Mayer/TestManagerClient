import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../product/product.service';
import { Product } from '../product/product';
import { ProductAddEditComponent } from '../product-addedit/product-addedit.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})


export class ProductListComponent implements OnInit {

  constructor(private productService: ProductService,
    private dialog: MatDialog,
    private router: Router) { 


  }


// TODO: Seite direkt in Inputfeld eingeben

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  searchKeywordFilter = new FormControl();

  dataSource = new MatTableDataSource<Product>();
  pageSize = 10;
  pageIndex = 0;
  totalItems = 0;
  sortDirection = 'asc';


  displayedColumns: string[] = ['name', 'actions'];


  ngOnInit(): void {
    this.loadProducts();
  }

  ngAfterViewInit(): void {
    // Reagiere auf Paginierungsereignisse
    this.paginator.page.subscribe(() => {
      this.pageIndex = this.paginator.pageIndex;
      this.pageSize = this.paginator.pageSize;
      this.loadProducts();
    });

    // Reagiere auf Sortierereignisse
    this.sort.sortChange.subscribe(() => {
      console.log("Change sort order to " + this.sort.direction)
      this.sortDirection = this.sort.direction;
      this.loadProducts();
    });
  }

  loadProducts() {
   
    var filterValue = this.searchKeywordFilter.value == null ? '' : this.searchKeywordFilter.value;
    this.productService.getProductsPagedSortedAndFiltered(filterValue,this.sortDirection,this.pageIndex, this.pageSize).subscribe(data => {
      this.dataSource.data = data.content;
      console.log(data);
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

    localStorage.setItem('selectedProduct', JSON.stringify(product));

    this.router.navigate(['/dashboard']);

  }

  applyFilter(event: Event) {
     const filterValue = (event.target as HTMLInputElement).value;
     console.log("filter - " + filterValue);
 
    this.productService.getProductsPagedSortedAndFiltered(filterValue,this.sortDirection,this.pageIndex, this.pageSize).subscribe(data => {
      this.dataSource.data = data.content;
      console.log(data);
      this.totalItems = data.totalElements;
    });
  }
}