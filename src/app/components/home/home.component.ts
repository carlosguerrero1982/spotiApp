
import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  grant_type:string="client_credentials";
  client_id:any="5c76b0608ddc4b26aabe76cffe310368";
  client_secret:any="c42be676031e4f5a97fe6b068835e3b3";
loading:boolean;
 error:boolean;
  token:any="";
  paises:any[]=[];
mensajeError:string | undefined;
  nuevasCanciones:any[]=[];


  constructor(private spotifyService:SpotifyService) { 
    this.token=this.spotifyService.getToken();
    this.loading=true;
    this.error=false;
  }

  ngOnInit(): void {


  //  this.token=this.spotifyService.getToken();

    this.spotifyService.getNewReleases()
    .subscribe((data:any)=>{

      console.log(data);
     
      this.nuevasCanciones=data;
      this.loading=false;

    }, (error)=>{

      this.error=true;
      this.loading=false;
      console.log(error);
      this.mensajeError= error.error.error.message;
    })

   
  }

  

}
