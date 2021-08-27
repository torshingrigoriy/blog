import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Post} from "../../shared/interfaces";
import {PostsService} from "../../shared/posts.service";

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.css']
})
export class CreatePageComponent implements OnInit {
  form: FormGroup;
  submitted: boolean = false;
  constructor(
    private _fb: FormBuilder,
    private _postsService: PostsService
  ) {
    this.form = _fb.group({
      name: _fb.control('', [Validators.required]),
      content: _fb.control('', [Validators.required]),
      author: _fb.control('', [Validators.required]),
    })
  }

  ngOnInit(): void {
  }

  submit() {
    this.submitted = true
    if(this.form.invalid) {
      return
    }
    const post: Post = {
      name: this.form.value.name,
      content: this.form.value.content,
      author: this.form.value.author,
      date: new Date()
    }
    this._postsService.create(post).subscribe((post:Post)=>{
      this.form.reset()
      this.submitted = false
    }, error => {
      this.submitted = false
    })
  }
}
