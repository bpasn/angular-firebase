import { ProductModel } from './../../models/product.model';
import { UserModel } from 'src/app/models/user.model';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/service/auth.service';
import { ProductService } from 'src/app/shared/services/products/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  Products: ProductModel[] = []
  constructor(private route: ActivatedRoute, private router: Router, private pdService: ProductService) {
    this.getProduct()
  }

  async ngOnInit(): Promise<void> {
    console.log("OnInit")

  }
  async getProduct() {
    try {
      this.pdService.getAllProduct().subscribe(data => {
        this.Products = data.map((e: any) => {
          return e.payload.doc.data()
        })
        console.log(this.Products)
      })
    } catch (error) {
      console.log(error)
    }
  }
  toDetail(id: string) {
    this.router.navigate(['products/' + id], { relativeTo: this.route });
  }
}
