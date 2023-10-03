import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IPeopleDiseases} from "../models/jsonDataModel";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PeopleDiseasesService {
  url : string = "http://localhost:3000/peopleDiseases";

  constructor(private http: HttpClient) { }

  getPeoples () {
    return this.http.get<IPeopleDiseases []>(this.url);
  }

  getPeople (id : number) : Observable<IPeopleDiseases> {
    return this.http.get<IPeopleDiseases>(`${this.url}/${id}`)
  }

  postPeople (people : IPeopleDiseases) {
    return this.http.post<IPeopleDiseases>(this.url, people);
  }

  updatePeople(people : IPeopleDiseases) {
    return this.http.put<IPeopleDiseases>(`${this.url}/${people.id}`, people)
  }

  deletePeople(id : number) {
    return this.http.delete<IPeopleDiseases>(`${this.url}/${id}`)
  }
}
