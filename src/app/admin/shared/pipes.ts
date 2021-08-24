import {Pipe, PipeTransform} from "@angular/core";
import {Post} from "../../shared/interfaces";

@Pipe({
  name: 'searchPosts'
})
export class SearchPipe implements PipeTransform {
  transform(posts: Post[], search = ''): Post[] {
    if(!search.trim()) {
      return posts
    }
    return posts.filter((post: Post)=>{
      return post.name.toLowerCase().includes(search.toLowerCase()) || post.author.toLowerCase().includes(search.toLowerCase())
    })
  }

}
