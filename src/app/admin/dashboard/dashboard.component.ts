import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostsService} from "../../shared/posts.service";
import {Post} from "../../shared/interfaces";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  posts: Post[] = []
  pSub: Subscription
  dSub: Subscription
  searchString: string;

  constructor(
    private _posts: PostsService
  ) {
  }

  ngOnInit(): void {
    this.pSub = this._posts.getAll().subscribe((posts) => {
      this.posts = posts
    }, error => {
      console.log(error)
    })
  }

  ngOnDestroy() {
    if (this.pSub) {
      this.pSub.unsubscribe()
    }
    if (this.dSub) {
      this.dSub.unsubscribe()
    }
  }

  remove(id: string) {
    this.dSub = this._posts.delete(id).subscribe(() => {
        this.posts = this.posts.filter(post => post.id !== id)
      },error => console.log(error)
    )
  }
}
