import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  templateUrl: './search-box.component.html'
})
export class SearchBoxComponent {

  @ViewChild('txtTagInput') //SE USA LA REFRENCIA LOCAL EN HTML "#txtTagInput"
  public tagInput!: ElementRef<HTMLInputElement>; //NO NULL OPERATOR: !

  constructor( private gifsService: GifsService ){}

  searchTag (){
    const newTag = this.tagInput.nativeElement.value;

    this.gifsService.searhTag(newTag);

    this.tagInput.nativeElement.value = '';
  }
}
