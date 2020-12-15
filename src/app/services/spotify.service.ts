import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';

import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  token:any="";


  constructor(private http:HttpClient) {
    console.log("Servicio Listo");
   }



   getQuery(query:string){

    const url=`https://api.spotify.com/v1/${query}`;

    var headers = {
      headers: new HttpHeaders()
       .set('Authorization',  `Bearer BQCrGizULURYCEBruq4NKtCE42RtpBpqHsnMp0PtlnF3H8vo1DJg6haj66K1tMSIRHXe3HVp4I4VZavBITQ`)
    }

    return this.http.get(url,headers);

   }

   getToken(){

    const body = new HttpParams()
    .set('grant_type', "client_credentials")
    .set('client_id', '5c76b0608ddc4b26aabe76cffe310368')
    .set('client_secret', 'c42be676031e4f5a97fe6b068835e3b3');


    return this.http.post('https://accounts.spotify.com/api/token',body.toString(), {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    })
    .subscribe((data:any)=>{

      this.token= data[Object.keys(data)[0]];

     console.log(this.token);

   
    })

  }

   getNewReleases(){

   // const headers = new HttpHeaders({

    //  'Authorization': `Bearer ${token}`
   // })

  // var headers = {
   //   headers: new HttpHeaders()
   //    .set('Authorization',  `Bearer BQD-7GkRgdbEUadrmdWWNwTuDD-On_7Znx-w-8toJAFt1ljUlAti_B4e7bC6nGiJmNzV7_QTy8Ow2HWjTcc`)
   // }

 

    return this.getQuery('browse/new-releases?limit=50').
    pipe((map((data:any) =>{

      return data['albums'].items;
    

    })));
    
  //  this.http.get('https://api.spotify.com/v1/browse/new-releases?limit=50',headers).
  //  pipe(map((data:any) =>{

    //  return data['albums'].items;
    

  //  }));
     
    
  }

  getArtista(termino:string){

  //  var headers = {
    //  headers: new HttpHeaders()
   //    .set('Authorization',  `Bearer BQD-7GkRgdbEUadrmdWWNwTuDD-On_7Znx-w-8toJAFt1ljUlAti_B4e7bC6nGiJmNzV7_QTy8Ow2HWjTcc`)
  //  }

  return this.getQuery(`search?q=${termino}&type=artist&limit=10&offset=5`).
  pipe(map((data:any) =>{

    return data['artists'].items;
  

  }));

   // return this.http.get(`https://api.spotify.com/v1/search?q=${termino}&type=artist&limit=10&offset=5`,headers).
  //   pipe(map((data:any) =>{

    //  return data['artists'].items;
    

    //}));
     

  }

  getArt(id:string){


  
    return this.getQuery(`artists/${id}`);
   // pipe(map((data:any) =>{
  
    //  return data['artists'].items;
    

  
   // }));
  
     
  
    }

    getTopTracks(id:string){


  
      return this.getQuery(`artists/${id}/top-tracks?market=ES`).
      pipe(map((data:any) =>{
    
        return data['tracks'];
      
  
    
      }));
    
       
    
      }

}
