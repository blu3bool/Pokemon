import { PokeballService } from './../services/pokeball.services';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page implements OnInit {
  pokeballdetail? = null;
  slide0pts = {
    autoplay: {
      delay: 1000,
      disableOnInteraction: false
    }
  };
  constructor(private route: ActivatedRoute,private pokeballService: PokeballService) {}

  ngOnInit(){
    const name = this.route.snapshot.paramMap.get('name');
    this.pokeballService.getPokeballDetails(name).subscribe(res =>{
      this.pokeballdetail = res;

    });
  }

}
