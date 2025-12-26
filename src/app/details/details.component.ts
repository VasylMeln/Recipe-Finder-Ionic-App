import { Component } from '@angular/core';
import { LocalData } from '../services/local-data';
import { HttpConnection } from '../services/http-connection';
import { HttpOptions } from '@capacitor/core/types/core-plugins';
import { IonContent, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, 
  IonCardTitle,  IonItemDivider, IonItemGroup, IonLabel, IonItem } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  imports: [CommonModule, FormsModule, IonContent, IonButton, IonCard, 
    IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonItemDivider, IonItemGroup, IonLabel, IonItem]

})
export class DetailsComponent {

  constructor(private ld:LocalData, private connector: HttpConnection) { }
  response1:any; 
  response2:any;
  measure:string = ''; 
  options1!:HttpOptions;
  options2!:HttpOptions;
  detailsID:string = '';
  extIngr:any;
  instructions:any;
  apiKey:string='70759a4f7911402abcc53d3c51d3b759';
  isFavorite:boolean=false;
  favs:any;

  async ngOnInit() {
    this.detailsID = await this.ld.get('detailsID');
    this.measure = (await this.ld.get('units'))?.toLowerCase();

    this.setOptions1();
    this.setOptions2();
    await this.query();

    let favs = await this.ld.get('favorites');
      if (favs === null || favs === undefined) {
      this.favs = [];
      }
      this.isFavorite = await this.favs.includes(this.detailsID);

  }

  //async getID() {this.detailsID = await this.ld.get('detailsID');}


  setOptions1(){ this.options1 = {
    url: `https://api.spoonacular.com/recipes/${this.detailsID}/information?apiKey=${this.apiKey}`,
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  };}
  
  setOptions2(){ this.options2 = {
    url: `https://api.spoonacular.com/recipes/${this.detailsID}/analyzedInstructions?apiKey=${this.apiKey}`,
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  };}

 async query() {

    try {
    let res1 = await this.connector.get(this.options1);
    this.response1 = res1.data;
    let res2 = await this.connector.get(this.options2);
    this.response2 = res2.data;
    this.extIngr = this.response1.extendedIngredients;
    this.instructions = this.response2[0].steps;
    console.log(this.response1);

    } catch (error) {
      console.error ('HTTP Error:', error);
    }

    
  }

  async addToFavorites(){
    this.favs.push(this.detailsID);
    await this.ld.set('favorites',this.favs);
    this.isFavorite = true;
  };

  async removeFromFavorites(){
    let index = this.favs.indexOf(this.detailsID);
    if (index !== -1) {
      this.favs.splice(index, 1);
    }
    await this.ld.set('favorites', this.favs);
    this.isFavorite = false;
  };

  
}
