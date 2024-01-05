import {Component, Output, EventEmitter, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {faArrowRight, faSearch} from "@fortawesome/free-solid-svg-icons";
import {ThemoviedbService} from "../../themoviedb.service";
import {delay, Subject, takeUntil} from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit{
  @Input() query: string = '';
  @Output() queryEvent = new EventEmitter<string>();
  searchInput = new Subject<string>();
  private formSubmitted = new Subject<void>();

  constructor(private router: Router, private themoviedbService: ThemoviedbService) {}

  handleSendQuery(event: Event): void {
    event.preventDefault();
    if (this.query) {
      this.queryEvent.emit(this.query);
      this.formSubmitted.next();
    }
  }

  ngOnInit(): void {
    this.searchInput.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      takeUntil(this.formSubmitted)
    ).subscribe(query => {
      if (query.length > 3) {
        this.query = query;
        this.queryEvent.emit(this.query);
      }
    });
  }

  onInputChange(query: EventTarget | null): void {
    if (!query) return;
    const queryValue = (query as HTMLInputElement).value;

    this.searchInput.next(queryValue);
  }

  protected readonly faSearch = faSearch;
  protected readonly faArrowRight = faArrowRight;
  protected readonly HTMLInputElement = HTMLInputElement;
}
