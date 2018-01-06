import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GridComponent } from './grid/grid.component';
import { SortPipe } from './grid/pipes/sort.pipe';
import { FilterPipe } from './grid/pipes/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    SortPipe,
    FilterPipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
