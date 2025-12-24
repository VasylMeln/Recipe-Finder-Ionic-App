import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { IonButton, IonInput, IonItem, IonList, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { HttpConnection } from '../services/http-connection';
import { HttpOptions } from '@capacitor/core/types/core-plugins';
import { CommonModule } from '@angular/common';
import { LocalData } from '../services/local-data';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent,IonInput, IonItem, IonList, IonButton, FormsModule, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle],
})
export class HomePage {
  constructor(private connector: HttpConnection, private ld:LocalData, private router:Router) {}
  response:any; 
  searchResults:any;
  options!:HttpOptions;
  
  apiKey:string='70759a4f7911402abcc53d3c51d3b759';
  
  ingredientInput: string = '';
  userIngredients: string = '';

  
  
  
  ngOnInit() {
    this.searchResults = [];
  }

 async Search() {

    
    this.userIngredients=this.ingredientInput;
    console.log("ingredientInput:" + this.ingredientInput);
    this.options = {
      url: `https://api.spoonacular.com/recipes/complexSearch?apiKey=${this.apiKey}&includeIngredients=${this.userIngredients}`,
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    };


    await this.query();
    console.log("1 Response:" + this.response);
    console.log("2 Response results:" + this.response.results);
    this.searchResults = this.response.results;
  }
  


  async query() {

    try {
    let res = await this.connector.get(this.options);
    this.response = res.data;
    console.log(this.response);
    } catch (error) {
      console.error ('HTTP Error:', error);
    }
  }

  async openDetails(id: number) {
    await this.ld.set('detailsID', id.toString());
    this.router.navigateByUrl('/details');

  }

}
