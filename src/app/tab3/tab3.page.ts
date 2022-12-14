import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { PokeballService } from '../services/pokeball.services';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  pokeball = [];
  limit = 0;
  
  constructor(private pokeballService: PokeballService, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.loadPokeball();
  }

  async loadPokeball(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
      message: 'Loading',
      spinner: 'bubbles',
    });

    await loading.present();

    this.pokeballService.getPokeball(this.limit).subscribe((res) => {
      loading.dismiss();
      res.results.forEach(result => {
        this.pokeballService.getPokeballDetails(result.name).subscribe((uniqres) => {
          this.pokeball.push(uniqres);
        });
        event?.target.complete();
      });
    });
  }
  loadMorePokeball(event: any) {
    this.limit = this.limit + 20;
    this.loadPokeball(event);
  }
  handleChange(event) {
    const value = event.target.value.toLowerCase();
    if (value == ''){
      this.limit= 0;
      this.pokeball=[];
      this.loadPokeball();
      return;
    }
    this.pokeballService.findPokemon(value).subscribe(res =>{
      this.pokeball=[res];
    }, err => {
      this.pokeball=[];
    })
  }
}

