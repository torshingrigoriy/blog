import {Component, Input, OnInit} from '@angular/core';
import {PostsService} from "../shared/posts.service";
import {ActivatedRoute, Params} from "@angular/router";
import {Observable} from "rxjs";
import {Post} from "../shared/interfaces";
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.css']
})
export class PostPageComponent implements OnInit {
  @Input() post$: Observable<Post>

  constructor(
    private _postService: PostsService,
    private _route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.post$ = this._route.params.pipe(
      switchMap((params: Params) => {
        return this._postService.getById(params.id)
      }))
  }

}
