import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../enviroments/enviroment';
import { Observable } from 'rxjs';
import { Person } from '../interfaces/person.interface';
import { Errors } from '../interfaces/error.interface';
import { IdeletePersonResponse } from '../interfaces/deleteResponse.interface';
import { personsResponse } from '../interfaces/personsResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private baseUrl = environment.apiUrl; 

  constructor( private http: HttpClient) { }


  createPerson(person: Person): Observable<Person| Errors> {
    
    const url = `${this.baseUrl}/people`;

    return this.http.post<Person|Errors>(url, person);
  
  }

  /*
  * This version without pagination
  getPeople(): Observable<Person[]> {

    const url = `${this.baseUrl}/people`;
     
    return this.http.get<Person[]>(url);

  }

  */
  //with pagination

  getPeople(page: number): Observable<personsResponse> {
    console.log("PAGE ==>> ", page);
    const url = `${this.baseUrl}/people?page=`+page;
     
    return this.http.get<personsResponse>(url);

  }

  getPersonById(id: number): Observable<Person> {

    const url = `${this.baseUrl}/people/${id}/edit`;
     
    return this.http.get<Person>(url);

  }

  updatePerson(person: Person): Observable<Person| Errors> {
    
    const url = `${this.baseUrl}/people/${person.id}`;

    return this.http.put<Person|Errors>(url, person);
  
  }


  deletePerson(id: number): Observable<IdeletePersonResponse> {

    const url = `${this.baseUrl}/people/${id}`;
     
    return this.http.delete<IdeletePersonResponse>(url);

  }

}
