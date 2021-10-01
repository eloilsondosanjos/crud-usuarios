import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrlAPI = "http://localhost:3001/users"

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    });
  }

  create(user: User): Observable<User> {
    return this.http.post<User>(this.baseUrlAPI, user)
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
}
