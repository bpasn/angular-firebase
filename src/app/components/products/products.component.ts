import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }
  toDetail(id: number) {
    this.router.navigate(['products/' + id], { relativeTo: this.route });
  }
}
