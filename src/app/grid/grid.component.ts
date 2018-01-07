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
  _fallbacktoCSV = true;
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

  downloadXls() {
    const tableId = 'datagrid';
    if ((this._getMsieVersion() || this._isFirefox()) && this._fallbacktoCSV) {
      return this.toCSV(tableId, 'outputfile');
    } else if (this._getMsieVersion() || this._isFirefox()) {
      alert('Not supported browser');
    }
    const htmltable = document.getElementById(tableId);
    const html = htmltable.outerHTML;

    this._downloadAnchor('data:application/vnd.ms-excel' + encodeURIComponent(html), 'xls', 'outputfile');
  }
  _getMsieVersion() {
    const ua = window.navigator.userAgent;

    const msie = ua.indexOf('MSIE ');
    if (msie > 0) {
      // IE 10 or older => return version number
      return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    const trident = ua.indexOf('Trident/');
    if (trident > 0) {
      // IE 11 => return version number
      const rv = ua.indexOf('rv:');
      return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    const edge = ua.indexOf('Edge/');
    if (edge > 0) {
      // Edge (IE 12+) => return version number
      return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }

    // other browser
    return false;
  }
  _isFirefox() {
    if (navigator.userAgent.indexOf('Firefox') > 0) {
      return 1;
    }
    return 0;
  }
  toCSV (tableId, filename) {
    filename = (typeof filename === 'undefined') ? tableId : filename;
    // Generate our CSV string from out HTML Table
    const csv = this._tableToCSV(document.getElementById(tableId));
    // Create a CSV Blob
    const blob = new Blob([csv], { type: 'text/csv' });

    // Determine which approach to take for the download
    if (navigator.msSaveOrOpenBlob) {
      // Works for Internet Explorer and Microsoft Edge
      navigator.msSaveOrOpenBlob(blob, filename + '.csv');
    } else {
      this._downloadAnchor(URL.createObjectURL(blob), 'csv', filename);
    }
  }
  _downloadAnchor(content, ext, filename) {
    const anchor = document.createElement('a');
    anchor.style.display = 'none !important';
    anchor.id = 'downloadanchor';
    document.body.appendChild(anchor);

    // If the [download] attribute is supported, try to use it
    if ('download' in anchor) {
      anchor.download = filename + '.' + ext;
    }
    anchor.href = content;
    anchor.click();
    anchor.remove();
}
_tableToCSV(table) {
  // We'll be co-opting `slice` to create arrays
  const slice = Array.prototype.slice;

  return slice
    .call(table.rows)
    .map(function(row) {
      return slice
        .call(row.cells)
        .map(function(cell) {
          return '"t"'.replace('t', cell.textContent);
        })
        .join(',');
    })
    .join('\r\n');
}
}
