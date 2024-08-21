import { Component } from '@angular/core';

import { addIcons } from 'ionicons';
import {
  chevronDownCircle,
  chevronForwardCircle,
  chevronUpCircle,
  peopleCircle,
  personCircle,
} from 'ionicons/icons';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage {
  constructor() {
    addIcons({
      chevronDownCircle,
      chevronForwardCircle,
      chevronUpCircle,
      peopleCircle,
      personCircle,
    });
  }
}
