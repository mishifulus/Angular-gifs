import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchResponse, Gif } from '../interfaces/gifs.interfaces';

@Injectable({providedIn: 'root'})
export class GifsService {

  public gifList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private apiKey: string = "4W3Eo1ZbHLB8d9R1IolXjPqLMQtjXsFd";
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor( private http:HttpClient) {
    this.loadLocalSavage();
    console.log('Gifs service ready');
   }

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();

    if (this._tagsHistory.includes(tag))
    {
      this._tagsHistory = this._tagsHistory.filter( (oldTag ) => oldTag !== tag);
    }

    this._tagsHistory.unshift(tag);

    this._tagsHistory = this.tagsHistory.splice(0,10);

    this.saveLocalStorage();

  }

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadLocalSavage(): void {
    if (!localStorage.getItem('history')) return

    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);

    if(this._tagsHistory.length === 0) return;
    this.searhTag(this._tagsHistory[0]);

  }

  searhTag( tag: string ):void {
    if (tag.length === 0) return;
    this.organizeHistory(tag);

    // fetch('https://api.giphy.com/v1/gifs/search?api_key=4W3Eo1ZbHLB8d9R1IolXjPqLMQtjXsFd&q=valorant&limit=10')
    // .then(resp => resp.json())
    // .then(data => console.log(data));

    // const resp = await fetch('https://api.giphy.com/v1/gifs/search?api_key=4W3Eo1ZbHLB8d9R1IolXjPqLMQtjXsFd&q=valorant&limit=10')
    // const data = await resp.json();
    // console.log(data);

    const params = new HttpParams()
    .set('api_key', this.apiKey)
    .set('limit', '10')
    .set('q', tag)

    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, {params:params})
    .subscribe( resp => {

      this.gifList = resp.data;
    });

  }

}
