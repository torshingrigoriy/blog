import {NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {QuillEditorComponent, QuillModule} from "ngx-quill";

@NgModule({
  imports: [
    HttpClientModule,
    QuillModule.forRoot()
  ],
  exports: [
    HttpClientModule,
    QuillModule
  ]
})
export class SharedModule {
}
