import {
  Component,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  Renderer,
  ViewChildren
} from '@angular/core';
import { Poi } from '../../../core/services/clip/index';
import { Tag } from '../../../core/services/clip/tag';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss']
})
export class ContextMenuComponent implements OnInit {
  @ViewChildren('inputBox') vc: QueryList<ElementRef>;

  constructor() {}

  @Input() x = 0;
  @Input() y = 0;
  @Input() poi: Poi;
  @Input() open: boolean;
  @Output() openChange = new EventEmitter<boolean>();

  ngOnInit() {}

  ngAfterViewInit() {
    this.vc.changes.subscribe(elements => {
      // setting focus in a timeout removes an error:
      // ExpressionChangedAfterItHasBeenCheckedError
      setTimeout(() => {
        elements.last.nativeElement.focus();
      }, 1);
    });
  }

  close() {
    this.openChange.emit(false);
  }

  add() {
    const newTag = new Tag();
    newTag.value = '';
    this.poi.tags.push(newTag);
  }

  remove(tag: Tag) {
    this.poi.tags = this.poi.tags.filter(x => x.value != tag.value);
  }
}
