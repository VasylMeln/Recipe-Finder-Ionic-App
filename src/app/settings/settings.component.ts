import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonRadio, IonRadioGroup,IonContent } from '@ionic/angular/standalone';
import { LocalData } from '../services/local-data';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  imports: [IonRadio, IonRadioGroup, FormsModule, IonContent],
})
export class SettingsComponent {
  units: string = "Metric";

  constructor(private ld: LocalData) { }
  

  ngOnInit() {
    this.unitsUpdate();

  }

  async unitsUpdate() {
    let savedUnits = await this.ld.get('units');

    if (savedUnits != null) {this.units = savedUnits;}
    else this.units = "Metric";
    await this.ld.set ('units', this.units);
  }

  async onRadioChange (event: any) {
    let radio = event.detail.value;
    this.units = radio;
    await this.ld.set ('units', radio);
  }
}
