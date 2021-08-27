import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Params} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {PostsService} from "../../shared/posts.service";
import {Post} from "../../shared/interfaces";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})
export class EditPageComponent implements OnInit, OnDestroy {
  form: FormGroup;
  post: Post;
  submitted: boolean;
  uSub: Subscription;

  constructor(
    private _postsService: PostsService,
    private _route: ActivatedRoute,
    private _fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this._route.params
      .pipe(
        switchMap((params: Params) => {
          return this._postsService.getById(params['id'])
        })
      ).subscribe((post: Post) => {
      this.post = post;
      this.form = this._fb.group({
        name: [post.name, [Validators.required]],
        content: [post.content, [Validators.required]]
      })
    })
  }

  ngOnDestroy() {
    if(this.uSub) {
      this.uSub.unsubscribe()
    }
  }

  submit() {
    if (this.form.invalid) {
      return
    }
    this.submitted = true;
    this.uSub = this._postsService.update({
      ...this.post,
      name: this.form.value.name,
      content: this.form.value.content,
    }).subscribe(()=>{
      this.submitted = false
    }, error => this.submitted = false)
  }
}
