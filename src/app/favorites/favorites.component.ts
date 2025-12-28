import { Component } from '@angular/core';
import { LocalData } from '../services/local-data';
import { HttpConnection } from '../services/http-connection';
import { HttpOptions } from '@capacitor/core/types/core-plugins';
import { IonContent, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, 
  IonCardTitle,  IonItemDivider, IonItemGroup, IonLabel, IonItem,IonCol, IonGrid, IonRow } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  imports: [CommonModule, FormsModule, IonContent, IonButton, IonCard, 
    IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonItemDivider, IonItemGroup, 
    IonLabel, IonItem, IonCol, IonGrid, IonRow]


})
export class FavoritesComponent {

  constructor(private ld:LocalData, private connector: HttpConnection, private router:Router) { }

  //options!:HttpOptions;
  favs:string[] = [];
  apiKey:string='70759a4f7911402abcc53d3c51d3b759';
  favRecipes: any[] = [];


  async ngOnInit() {
    let favs = await this.ld.get('favorites');
      if (favs === null || favs === undefined) {
      this.favs = [];
      }
      this.favs = favs;

    this.loadFavs();

  }


async loadFavs() {

    for (let ID of this.favs) {
      let options = {
      url: `https://api.spoonacular.com/recipes/${ID}/information?apiKey=${this.apiKey}`,
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    };

    try {
    let res = await this.connector.get(options);
    this.favRecipes.push({
      id: res.data.id,
      image: res.data.image,
      title: res.data.title
    });
    //this.response = res.data;

    //console.log(this.response);

    } catch (error) {
      console.error ('HTTP Error:', error);
      }

    }
  }//end of loadFavs

async openDetails(id: number) {
    await this.ld.set('detailsID', id.toString());
    this.router.navigateByUrl('/details');
}
}