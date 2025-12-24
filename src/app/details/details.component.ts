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
  response:any; 
  measure:string = ''; 
  options!:HttpOptions;
  detailsID:string = '';
  extIngr:any;
  apiKey:string='70759a4f7911402abcc53d3c51d3b759';

  async ngOnInit() {
    this.detailsID = await this.ld.get('detailsID');
    this.measure = (await this.ld.get('units'))?.toLowerCase();

    this.setOptions();
    await this.query();
  }

  //async getID() {this.detailsID = await this.ld.get('detailsID');}


  setOptions(){ this.options = {
    url: `https://api.spoonacular.com/recipes/${this.detailsID}/information?apiKey=${this.apiKey}`,
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  };}
  

 async query() {

    try {
    let res = await this.connector.get(this.options);
    this.response = res.data;
    this.extIngr = this.response.extendedIngredients;
    console.log(this.response);

    } catch (error) {
      console.error ('HTTP Error:', error);
    }

    
  }

  
}
