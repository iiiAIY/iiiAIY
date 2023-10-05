import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {IPeople, IPeopleInfo} from "../models/PeopleModels";
import {HttpClient} from "@angular/common/http";

@Injectable()

export class PeopleService {
  urlWithoutInfo : string = "http://localhost:3000/api/peoples"
  urlPeopleInfo : string = "http://localhost:3000/api/morePeopleInfo"
  // peopleInfo: string = "?_embed=morePeopleInfo"

  constructor(private http: HttpClient) { }

  public getPeoples() : Observable<IPeople []> {
    return this.http.get<IPeople []>(this.urlWithoutInfo);
  }

  public getPeople(id: number) : Observable<IPeople> {
    return this.http.get<IPeople>(`${this.urlWithoutInfo}/${id}`);
  }

  public getPeopleInfo(id: number) : Observable<IPeopleInfo> {
    return this.http.get<IPeopleInfo>(`${this.urlPeopleInfo}/${id}`);
  }

  public updatePeople(people : IPeople) : Observable<IPeople> {
    return this.http.put<IPeople>(`${this.urlWithoutInfo}/${people.id}`, people);
  }

  public updatePeopleInfo(peopleInfo : IPeopleInfo) : Observable<IPeopleInfo> {
    return this.http.put<IPeopleInfo>(`${this.urlPeopleInfo}/${peopleInfo.id}`, peopleInfo);
  }

  public postPeople(people: IPeople) : Observable<IPeople> {
    return this.http.post<IPeople>(this.urlWithoutInfo, people);
  }

  public postPeopleInfo(peopleInfo: IPeopleInfo) : Observable<IPeopleInfo> {
    return this.http.post<IPeopleInfo>(this.urlPeopleInfo, peopleInfo);
  }
}
