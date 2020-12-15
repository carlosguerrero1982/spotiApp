import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  artistas:any[]=[];

  loading:boolean | undefined;

  constructor(private spotifyService:SpotifyService) {
    
   }

  ngOnInit(): void {
  }

  buscar(termino:string){
    console.log(termino);
    this.loading=true;
    this.spotifyService.getArtista(termino)
    .subscribe((data:any)=>{

   //   console.log(data.artists.items);

   console.log(data);
      this.artistas=data;
      this.loading=false;
    })
  }

}
