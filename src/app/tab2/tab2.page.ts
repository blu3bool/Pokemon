import { StorageService } from './../storage/storage.service';
import { PokemonService} from './../services/pokemon.services';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  pokemondetail? = null;
  favoritePokemon = [];
  slide0pts = {
    autoplay: {
      delay: 1000,
      disableOnInteraction: false
    }
  };
  constructor(private route: ActivatedRoute,private pokemonService: PokemonService,  private storageService: StorageService) {}

  ngOnInit(){
    const name = this.route.snapshot.paramMap.get('name');
    this.pokemonService.getPokemonDetails(name).subscribe(res =>{
      this.pokemondetail = res;

    });
  }
  favorite(pokemonqq) {
    this.favoritePokemon.push(pokemonqq);
    let unique = [...new Set(this.favoritePokemon)];
    this.storageService.setData('favorite',unique);

  }

}
