import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { IonButton, IonInput, IonItem, IonList } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent,IonInput, IonItem, IonList, IonButton, FormsModule],
})
export class HomePage {
  constructor() {}

  userIngredients: string = '';
  ingredientInput: string = '';

  Search() {
    this.userIngredients=this.ingredientInput;
    

  }
}
