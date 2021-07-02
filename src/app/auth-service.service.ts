import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Observable , from} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient) { }

  public baseURL = "http://localhost:3000/"

  public registerUser(data:any){
    var headers = new Headers();
    headers.append("Content-Type","application/json");
    return this.http.post<any>(this.baseURL + "signup" ,data)
  }

  public LoginUser(data:any){
    var headers = new Headers();
    headers.append("Content-Type","application/json");
    return this.http.post<any>(this.baseURL + "login" ,data)
  }

  public getProfiles(){
    var headers = new Headers();
    headers.append("Content-Type","application/json");
    return this.http.get<any>(this.baseURL + "get-profile")
  }


  public PostProfile(data:any){
    var headers = new Headers();
    headers.append("Content-Type","application/json");
    return this.http.post<any>(this.baseURL + "add" ,data)
  }
}
