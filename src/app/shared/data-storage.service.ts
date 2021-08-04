import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';

@Injectable({providedIn: 'root'})
export class DataStorageService {
    constructor(private http: HttpClient, private recipesService: RecipeService) {}

    storeRecipes() {
        const recipes = this.recipesService.getRecipes();
        this.http
            .put(
                'https://ng-course-recipe-book-dd9ba-default-rtdb.firebaseio.com/recipes.json',
                recipes
            )
            .subscribe(response => {
                console.log(response);
            });
    }

    fetchRecipes() {
        this.http
            .get<Recipe[]>(
                'https://ng-course-recipe-book-dd9ba-default-rtdb.firebaseio.com/recipes.json'
            )
            .pipe(map(recipes => {
                return recipes.map(recipe => {
                    return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
                });
            }))
            .subscribe(recipes => {
                this.recipesService.setRecipes(recipes);
            })
    }
}