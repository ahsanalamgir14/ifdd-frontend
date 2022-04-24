import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url: string = '/users';

  constructor(private http: HttpClient) { }

  getMe(): Observable<User> {
    return this.http.get<User>(`/user/me`).pipe(
      map((response: any) => {
        const userData = response.data?.user;
        const user = new User(
          userData.id,
          userData.name,
          userData.email,
          userData.role
        )

        return user;
      })
    );
  }
}
