import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { PokemonService } from '../services/pokemon.services';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { StorageService } from '../storage/storage.service';


@Component({
  selector: 'app-tab5',
  templateUrl: 'tab5.page.html',
  styleUrls: ['tab5.page.scss']
})
export class Tab5Page implements OnInit {
  pokemon = [];
  pokemondetail = [];
  constructor(private pokemonService: PokemonService, private loadingCtrl: LoadingController, private storageService: StorageService) { }

  ngOnInit() {
    this.loadPokemon();
    
  }

  async loadPokemon() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading',
      spinner: 'bubbles',
    });

    await loading.present();
    let favoritePokemons = await this.storageService.getData('favorite');
    var temp = ''
      var uniquepokemon = favoritePokemons.sort().filter(r => {
      if (r.join("") !== temp) {
        temp = r.join("")
        return true
      }
    })
    loading.dismiss();
    uniquepokemon.forEach(pokemon => {
      this.pokemonService.getPokemonDetails(pokemon).subscribe(res =>{

        this.pokemondetail.push(res)
      });
      
    });
  }
  load(){
    this.pokemondetail=[]
    this.loadPokemon()
  }
  delete(){
    console.log('mazem')
    this.storageService.setData('favorite','Delete');
  }
  }
  