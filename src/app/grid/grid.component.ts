import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  constructor() { }
  @Input('data') data;
  sortBy: string;
  asc = true;
  filterColumn: string[] = [];
  values: string[] = [];
  showColums = false;
  showFilter = false;
  ngOnInit() {
  }

  onSortClick(columnName: string) {
    this.asc = this.sortBy === columnName ? !this.asc : true;
    this.sortBy = columnName;
  }

  addFilter($event) {
    if ($event.target.value) {
      if (this.filterColumn.indexOf($event.target.name) > -1) {
        this.values[this.filterColumn.indexOf($event.target.name)] = $event.target.value;
      } else {
        this.filterColumn.push($event.target.name);
        this.values.push($event.target.value);
      }
    } else {
      const num = this.filterColumn.indexOf($event.target.name);
      this.filterColumn = this.filterColumn.slice(0, num).concat(this.filterColumn.slice(num + 1));
      this.values = this.values.slice(0, num).concat(this.values.slice(num + 1));
    }
    this.filterColumn = Object.assign([], this.filterColumn);
    this.values = Object.assign([], this.values);
  }
  toggleColumns() {
    this.showColums = !this.showColums;
  }
  toggleFilters() {
    this.showFilter = !this.showFilter;
  }
}
