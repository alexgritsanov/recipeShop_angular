import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients: Ingredient[];
  private subsctiption: Subscription;
  // ingredients: Ingredient[] = [
  //   new Ingredient("Apples", 5),
  //   new Ingredient("Tomatos", 10)

  // ]

  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.slService.getIngredients();
    this.subsctiption = this.slService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients
      }
    )
  }

  onEditItem(index: number) {
    this.slService.startedEditing.next(index)
  }

  ngOnDestroy() {
    this.subsctiption.unsubscribe()
  }

  // onIngredientAdded(ingredient: Ingredient) {
  //   this.ingredients.push(ingredient)
  // }
}
