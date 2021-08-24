import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {FbCreateResponse, Post} from "./interfaces";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";
import {Observable, Subscription} from "rxjs";
import {ObjectAssignBuiltinFn} from "@angular/compiler-cli/src/ngtsc/partial_evaluator/src/builtin";


@Injectable({
  providedIn: 'root'
})
export class PostsService {
  constructor(
    private _http: HttpClient
  ) {
  }

  create(post: Post) {
    return this._http.post<Post>(`${environment.fbDBurl}/posts.json`, post)
      .pipe(map((response: FbCreateResponse) => {
        return {
          ...post,
          id: response.name,
          date: new Date()
        }
      }))
  }

  getAll(): Observable<Post[]> {
    return this._http.get<Post[]>(`${environment.fbDBurl}/posts.json`)
      .pipe(map((response: { [keys: string]: any }) => {
        return Object
          .keys(response)
          .map(key => ({
            ...response[key],
            id: key,
            date: new Date(response[key].date)
          }))
      }))
  }
  delete(id: string): Observable<void> {
    return this._http.delete<void>(`${environment.fbDBurl}/posts/${id}.json`)
  }
  getById(id: string): Observable<Post> {
    return this._http.get<Post>(`${environment.fbDBurl}/posts/${id}.json`)
      .pipe(map((post:Post)=>{
        return {
          ...post,
          id,
          date: new Date(post.date)
        }
      }))
  }
  update(post: Post): Observable<Post> {
    return this._http.patch<Post>(`${environment.fbDBurl}/posts/${post.id}.json`, post)
  }
}
