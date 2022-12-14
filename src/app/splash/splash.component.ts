import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss'],
})
export class SplashComponent implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  ionViewDidEnter(){
    setTimeout(() =>{
      this.modalController.dismiss();
    },0.5);
  }
}
