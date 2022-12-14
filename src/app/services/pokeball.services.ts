import { environment } from 'src/environments/environment';
import { Injectable } from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { Observable } from "rxjs";


export interface Result {
    name: string;
    url: string;
}

export interface ApiResult {
    count: number;
    next: string;
    previous?: any;
    results: Result[];
}
export interface Attribute {
    name: string;
    url: string;
}
export interface Sprites {
    default: string;
}
export interface Category {
    name: string;
    url: string;
}
export interface EffectEntry {
    effect: string;
    language: Language;
    short_effect: string;
}
export interface Language {
    name: string;
    url: string;
}

export interface RootObject {
    attributes: Attribute[];
    effect_entries: EffectEntry[];
    cost: number;
    id: number;
    name: string;
    sprites: Sprites;
    category: Category;
    
}

@Injectable({
    providedIn: 'root'
})
export class PokeballService {

    constructor(private http: HttpClient) { }
    
    
    getPokeball(limit): Observable<ApiResult> {
        return this.http.get<ApiResult>(`${environment.baseUrl}item/?offset=${limit}&limit=20`);
    }
    getPokeballDetails(name: string) : Observable<RootObject>{
        
        return this.http.get<RootObject>(`${environment.baseUrl}item/${name}`);
    }
    findPokemon(search){
        return this.http.get<RootObject>(`${environment.baseUrl}item/${search}`);
    }
    
    
}