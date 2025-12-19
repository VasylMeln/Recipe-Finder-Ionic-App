import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonRadio, IonRadioGroup } from '@ionic/angular/standalone';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  imports: [IonRadio, IonRadioGroup, FormsModule],
})
export class SettingsComponent {

  constructor() { }
  units: string = "Metric";

  ngOnInit() {}

}
