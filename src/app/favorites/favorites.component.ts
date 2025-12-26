import { Component } from '@angular/core';
import { LocalData } from '../services/local-data';
import { HttpConnection } from '../services/http-connection';
import { HttpOptions } from '@capacitor/core/types/core-plugins';
import { IonContent, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, 
  IonCardTitle,  IonItemDivider, IonItemGroup, IonLabel, IonItem } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  imports: [CommonModule, FormsModule, IonContent, IonButton, IonCard, 
    IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonItemDivider, IonItemGroup, IonLabel, IonItem]


})
export class FavoritesComponent {

  constructor(private ld:LocalData, private connector: HttpConnection) { }

  options!:HttpOptions;
  favs:any;
  apiKey:string='70759a4f7911402abcc53d3c51d3b759';

  async ngOnInit() {
    let favs = await this.ld.get('favorites');
      if (favs === null || favs === undefined) {
      this.favs = [];
      }

    this.setOptions();

  }

  setOptions(){ this.options = {
    url: `https://api.spoonacular.com/recipes/${this.detailsID}/information?apiKey=${this.apiKey}`,
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  };}


async query() {

    try {
    let res = await this.connector.get(this.options);
    this.response = res.data;
    
    //this.extIngr = this.response1.extendedIngredients;
    //this.instructions = this.response2[0].steps;
    console.log(this.response);

    } catch (error) {
      console.error ('HTTP Error:', error);
    }
  }

}
