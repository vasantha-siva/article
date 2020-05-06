import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import { ArticleComponent } from './article.component';
import { ArticleListComponent } from './article-list/article-list.component';
// import { CreateCategoryComponent } from './create-category/create-category.component';

export const articleRoutes: Routes = [
  { path: '', component: ArticleComponent, children: [
    { path: '', component: ArticleListComponent },
  // { path: 'create', loadChildren: '../category/create-category/create-category.module.ts#CreateCategoryModule'}
  ]},
];


export const ArticleRoute: ModuleWithProviders = RouterModule.forChild(articleRoutes);
