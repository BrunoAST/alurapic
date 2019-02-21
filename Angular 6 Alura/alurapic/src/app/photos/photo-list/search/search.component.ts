import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';

import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'ap-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit, OnDestroy {
  // Irá emitir para o componente filho o valor presente no filter;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onTyping: EventEmitter<string> = new EventEmitter<string>();

  @Input() value = '';

  debounce: Subject<string> = new Subject<string>();

  constructor() {}

  ngOnInit() {
    // Só irá realizar o filtro 300ms após o último keyup ter sido feito.
    this.debounce
      .pipe(debounceTime(300))
      // O filter é emitido para o componente filho.
      .subscribe(filter => this.onTyping.emit(filter));
  }

  ngOnDestroy() {
    this.debounce.unsubscribe();
  }
}
