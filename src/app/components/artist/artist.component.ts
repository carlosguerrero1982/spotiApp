import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';
import { DomseguroPipe } from '../../pipes/domseguro.pipe';


@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {

  artista:any={};
  loadingArtitst:boolean;
  topTracks:any[]=[];
  

  constructor(private router:ActivatedRoute, private spotifyService:SpotifyService) {
    this.loadingArtitst=true;
   }

  ngOnInit(): void {

    this.router.params.subscribe((params)=>{

      console.log(params['id']);

      this.getArtista(params['id']);
      this.getTopTracks(params['id']);
    })
  }

  getArtista(id:string){
    
    this.loadingArtitst=true;
    this.spotifyService.getArt(id).
    subscribe((artista)=>{

      console.log(artista);

      this.artista=artista;

      this.loadingArtitst=false;
    })
  }

  getTopTracks(id:string){

    this.spotifyService.getTopTracks(id).
    subscribe((data)=>{

      console.log(data);

      this.topTracks=data;

     
     
    })

  }
}
