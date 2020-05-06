import { Router } from '@angular/router';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ArticleService } from '../article.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
  public articleList: any;
  modalRef: BsModalRef;
  createArticleForm: FormGroup;
  isEdit = false;
  id: String;
  public artName;
  httpCreateArticleSubs: Subscription;
  httpgetArticleSubs: Subscription;
  httpUpdateArticleSubs: Subscription;
  httpDeleteArticleSubs: Subscription;
  public artDesc;
  page = 1;
  totalItems: any;
  totalUser: any;
  constructor(private modalService: BsModalService,
    private fb: FormBuilder,
    private articleService: ArticleService,
    private flashMessage: FlashMessagesService,
    private routes: Router) { }

  ngOnInit() {
    this.createArticleForm = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
      author: [''],
      id: ['']
    });
    this.loadArticleList();
  }

  loadArticleList() {
    console.log(this.page);
    this.httpgetArticleSubs = this.articleService
      .getArticleList(this.page)
      .subscribe(res => {
        this.articleList = res && res['body'].data;
        this.totalUser = res && res['body'].count;
        this.totalItems = this.articleList.length;
      });
  }

  pageChanged(event: any): void {
    //console.log(event.page);
    this.page = event.page;
    this.loadArticleList();
  }
  

  openModal(template: TemplateRef<any>) {
    this.createArticleForm.reset();
    this.isEdit = false;
    this.modalRef = this.modalService.show(template);
  }

  addArticle() {
    if (!this.createArticleForm.valid) {
      return false;
    }
    this.httpCreateArticleSubs = this.articleService
      .createArticle(this.createArticleForm.value)
      .subscribe(
        data => {
          if (data) {
            this.flashMessage.show("Article Created Successfully.", {
              cssClass: "alert-success",
              timeout: 1000
            });

            this.loadArticleList();
          }
        },
        error => {
          if (error.error.status === 406 || error.error.status === 409) {
            this.flashMessage.show(error.error.message, {
              cssClass: "alert-error",
              timeout: 2000
            });
          } else {
            if (error.error.code && error.error.code === 11000) {
              this.flashMessage.show(error.error.message, {
                cssClass: "alert-error",
                timeout: 2000
              });
            } else {
              this.flashMessage.show("Sorry, Something went wrong", {
                cssClass: "alert-error",
                timeout: 2000
              });
            }
          }
        }
      );

    this.modalRef.hide();
  }

  setModel(template, catValue) {
    console.log(JSON.stringify(catValue));
    this.modalRef = this.modalService.show(template);
    this.createArticleForm.patchValue({
      title: catValue.title,
      body: catValue.body,
      id: catValue.id,
      author: catValue.author
    });
    this.id = catValue.id;

    this.isEdit = true;
  }

  updateArticle() {
    if (!this.createArticleForm.valid) {
      return false;
    }

    this.httpUpdateArticleSubs = this.articleService
      .updateArticle(this.createArticleForm.value)
      .subscribe(
        data => {
          if (data) {
            console.log(data);
            this.flashMessage.show("Article Updated Successfully.", {
              cssClass: "alert-success",
              timeout: 1000
            });

            this.loadArticleList();
          }
        },
        error => {
          if (error.error.status === 406 || error.error.status === 409) {
            this.flashMessage.show(error.error.message, {
              cssClass: "alert-error",
              timeout: 2000
            });
          } else {
            if (error.error.code && error.error.code === 11000) {
              this.flashMessage.show(error.error.message, {
                cssClass: "alert-error",
                timeout: 2000
              });
            } else {
              this.flashMessage.show("Sorry, Something went wrong", {
                cssClass: "alert-error",
                timeout: 2000
              });
            }
          }
        }
      );

    this.modalRef.hide();
  }

  deleteArticle(article) {
    if (confirm("Are you sure to delete " + article.title)) {
      this.httpDeleteArticleSubs = this.articleService
        .deleteArticle(article)
        .subscribe(
          data => {
            if (data) {
              this.flashMessage.show("Article deleted Successfully.", {
                cssClass: "alert-success",
                timeout: 2000
              });

              this.loadArticleList();
            }
          },
          error => {
            if (error.error.status === 406 || error.error.status === 409) {
              this.flashMessage.show(error.error.message, {
                cssClass: "alert-error",
                timeout: 2000
              });
            } else {
              if (error.error.code && error.error.code === 11000) {
                this.flashMessage.show(error.error.message, {
                  cssClass: "alert-error",
                  timeout: 2000
                });
              } else {
                this.flashMessage.show("Sorry, Something went wrong", {
                  cssClass: "alert-error",
                  timeout: 2000
                });
              }
            }
          }
        );
    }
  }
  logout(){
    localStorage.clear();
    this.routes.navigate(['/']);
  }

  ngOnDestroy() {
    if (this.httpCreateArticleSubs) {
      this.httpCreateArticleSubs.unsubscribe();
    }
    if (this.httpgetArticleSubs) {
      this.httpgetArticleSubs.unsubscribe();
    }
    if (this.httpUpdateArticleSubs) {
      this.httpUpdateArticleSubs.unsubscribe();
    }
    if (this.httpDeleteArticleSubs) {
      this.httpDeleteArticleSubs.unsubscribe();
    }
    if (this.modalRef) {
      this.modalRef.hide();
    }
  }

}
