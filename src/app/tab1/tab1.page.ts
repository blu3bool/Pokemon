import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { PokemonService } from '../services/pokemon.services';
import { InfiniteScrollCustomEvent } from '@ionic/angular';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  pokemon = [];
  pokemondetail = [];
  limit = 0;
  constructor(private pokemonService: PokemonService, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.loadPokemon();
  }

  async loadPokemon(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
      message: 'Loading',
      spinner: 'bubbles',
    });

    await loading.present();

    this.pokemonService.getPokemon(this.limit).subscribe((res) => {
      loading.dismiss();
      res.results.forEach(result => {
        this.pokemonService.getPokemonDetails(result.name).subscribe((uniqres) => {
          this.pokemondetail.push(uniqres);
        });
        event?.target.complete();
        
      });
    });
    


  }
  loadMore(event: any) {
    this.limit = this.limit + 20;
    this.loadPokemon(event);
  }
  handleChange(event) {
    const value = event.target.value.toLowerCase();
    if (value == ''){
      this.limit= 0;
      this.pokemondetail=[];
      this.loadPokemon();
      return;
    }
    this.pokemonService.findPokemon(value).subscribe(res =>{
      this.pokemondetail=[res];
    }, err => {
      this.pokemondetail=[];
    })
  }
}
