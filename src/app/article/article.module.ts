import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ArticleComponent } from './article.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArticleService } from './article.service';
import {ArticleRoute} from './article.route';
@NgModule({
  imports: [
    CommonModule,
    ArticleRoute,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    PaginationModule.forRoot()
  ],
  declarations: [ArticleComponent, ArticleListComponent]
})
export class ArticleModule { }
