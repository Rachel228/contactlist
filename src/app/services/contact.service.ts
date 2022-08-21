import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {IContact} from "../models/IContact";
import {catchError, Observable, throwError} from "rxjs";
import {IGroup} from "../models/IGroup";

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private serverUrl: string = `http://localhost:9000`;

  constructor(private httpClient : HttpClient) {

  }

  public getAllContacts(): Observable<IContact[]>{
    let dataURL: string =`${this.serverUrl}/contacts`;
    return this.httpClient.get<IContact[]>(dataURL).pipe(catchError(this.handleError));
  }

  public getContact(contactId: string ): Observable<IContact>{
    let dataURL: string =`${this.serverUrl}/contacts/${contactId}`;
    return this.httpClient.get<IContact>(dataURL).pipe(catchError(this.handleError));
  }

  public createContact(contact : IContact): Observable<IContact>{
    let dataURL: string =`${this.serverUrl}/contacts`;
    return this.httpClient.post<IContact>(dataURL, contact).pipe(catchError(this.handleError));
  }

  public updateContact(contact : IContact, contactId: string ): Observable<IContact>{
    let dataURL: string =`${this.serverUrl}/contacts/${contactId}`;
    return this.httpClient.put<IContact>(dataURL, contact).pipe(catchError(this.handleError));
  }

  public deleteContact(contactId: string ): Observable<{}>{
    let dataURL: string =`${this.serverUrl}/contacts/${contactId}`;
    return this.httpClient.delete<{ }>(dataURL).pipe(catchError(this.handleError));
  }

  public getAllGroups(): Observable<IGroup[]>{
    let dataURL: string =`${this.serverUrl}/groups`;
    return this.httpClient.get<IGroup[]>(dataURL).pipe(catchError(this.handleError));
  }

  public getGroup(contact: IContact ): Observable<IGroup>{
    let dataURL: string =`${this.serverUrl}/groups/${contact.groupId}`;
    return this.httpClient.get<IGroup>(dataURL).pipe(catchError(this.handleError));
  }
  private handleError(error: HttpErrorResponse){
    let errorMessage : string = '';
    if (error.status === 0){
      errorMessage = `An error occurred: ${error.error}`;
    } else {
      errorMessage = `Backend return code ${error.status}, body was: ${error.error}`;
    }
    errorMessage += `\n Something bad happened`;
    return throwError(errorMessage);
  }
}
