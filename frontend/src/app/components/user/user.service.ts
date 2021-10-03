import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrlAPI = "http://localhost:3001/users"

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-success']
    });
  }

  create(user: User): Observable<User> {
    return this.http.post<User>(this.baseUrlAPI, user).pipe(catchError(e => this.errorHandler(e)))
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage('Ocorreu um erro!', true)
    return EMPTY
  }

  read(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrlAPI)
  }

  readById(id: string): Observable<User> {
    const url = `${this.baseUrlAPI}/${id}`

    return this.http.get<User>(url)
  }

  update(user: User): Observable<User> {
    const url = `${this.baseUrlAPI}/${user.id}`

    return this.http.put<User>(url, user)
  }

  delete(id: number): Observable<User> {
    const url = `${this.baseUrlAPI}/${id}`

    return this.http.delete<User>(url);
  }
}
