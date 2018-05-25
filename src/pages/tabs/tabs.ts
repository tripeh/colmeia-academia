import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { TrainingPage } from '../training/training';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = TrainingPage;

  constructor() {

  }
}
