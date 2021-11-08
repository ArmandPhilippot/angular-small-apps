import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipes } from 'src/app/shared/recipes';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {
  recipe: Partial<Recipes> = {};

  constructor(private storage: LocalStorageService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get("slug") || "";
    this.getRecipe(slug);
  }

  getRecipe(slug: string): void {
    const allRecipes = this.storage.get('recipes');
    const filteredRecipes = allRecipes.filter((meal: Recipes) => meal.slug === slug);
    this.recipe = filteredRecipes[0] ? filteredRecipes[0] : {};
  }

  getIngredients(): string[] {
    const ingredients = [];

    for (let i = 1; i <= 20; i++) {
      const currentMeasure = `strMeasure${i}` as keyof Recipes;
      const currentIngredient = `strIngredient${i}` as keyof Recipes;
      const ingredient = this.recipe[currentIngredient] ? `${this.recipe[currentMeasure]} ${this.recipe[currentIngredient]}` : '';
      if (ingredient) ingredients.push(ingredient);
    }

    return ingredients;
  }

}