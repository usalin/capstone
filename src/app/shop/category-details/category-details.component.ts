import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
})
export class CategoryDetailsComponent implements OnInit {

  
  private subscription!: Subscription;
  categoryName!: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(params => {
      this.categoryName = params['categoryName'];
      console.log(this.categoryName);
    });
  }

}
