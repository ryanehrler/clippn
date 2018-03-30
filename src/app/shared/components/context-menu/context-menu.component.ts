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
import { MatDialog } from '@angular/material';
import { Poi } from '../../../core/services/clip/index';
import { Tag } from '../../../core/services/clip/tag';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss']
})
export class ContextMenuComponent implements OnInit {
  @ViewChildren('inputBox') vc: QueryList<ElementRef>;

  deletePrompt = false;

  constructor(public dialog: MatDialog) {}

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
        if (elements.last) {
          elements.last.nativeElement.focus();
        }
      }, 1);
    });
  }

  close() {
    this.openChange.emit(false);
  }

  add() {
    const newTag = new Tag();
    newTag.value = '';
    newTag.deleted = false;
    this.poi.tags.push(newTag);
    // this is a little weird but basically must convert regular object into
    // "pure" javascript object for firebase -- see here: https://stackoverflow.com/questions/47190803/firestore-adding-object-with-an-array
    const map = this.poi.tags.map(obj => {
      return { ...obj };
    });
    this.poi.tags = map;
  }

  deletePoi() {
    this.poi.deleted = true;
    this.close();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deletePoi();
      }
    });
  }

  remove(tag: Tag) {
    this.poi.tags = this.poi.tags.filter(x => x.value != tag.value);
  }
}
