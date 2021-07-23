import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookDetailPage } from './book-detail.page';
import {AppLauncher} from "@ionic-native/app-launcher";
import {AppComponent} from "../../app.component";

const routes: Routes = [
  {
    path: '',
    component: BookDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [AppLauncher],
})
export class BookDetailPageRoutingModule {}
