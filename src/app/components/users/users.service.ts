import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/components/users/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private userBaseUrl = 'https://localhost:7179/api/Users/'

  constructor(private http: HttpClient) { }

  public getAllUsers(pageIndex: number, pageSize: number, sortBy: string, sortOrder: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.userBaseUrl}Get/${pageIndex}/${pageSize}/${sortBy}/${sortOrder}`);
  }

  public getuserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.userBaseUrl}GetBy/${id}`);
  }

  public updateUser(id: number, body: User): Observable<User> {
    return this.http.put<User>(`${this.userBaseUrl}Update/${id}`, body)
  }

  public createUser(body: User): Observable<User> {
    return this.http.post<User>(`${this.userBaseUrl}Create/`, body)
  }
}
