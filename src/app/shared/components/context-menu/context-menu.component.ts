import {
  AfterViewInit,
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
import { ClipService, Poi } from '../../../core/services/clip';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { ContextEnum } from '../../../core/services/context';
import { ContextService } from '../../../core/services/context/context.service';
import { MatDialog } from '@angular/material';
import { Tag } from '../../../core/services/clip/tag';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss']
})
export class ContextMenuComponent implements OnInit, AfterViewInit {
  @ViewChildren('inputBox') vc: QueryList<ElementRef>;

  deletePrompt = false;
  recentTags: Tag[];

  constructor(
    public dialog: MatDialog,
    private clipService: ClipService,
    private contextService: ContextService
  ) {}

  @Input() x = 0;
  @Input() y = 0;
  @Input() poi: Poi;
  @Input() open: boolean;
  @Output() openChange = new EventEmitter<boolean>();

  async ngOnInit() {
    this.recentTags = await this.clipService.getAllTags();
    console.table(this.recentTags);
    this.contextService.addContext(ContextEnum.PoiEdit);
  }

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
    this.contextService.popContext();
    this.openChange.emit(false);
  }

  add() {
    const newTag = new Tag();
    newTag.value = '';
    newTag.deleted = false;
    this.addTag(newTag);
  }

  addTag(tag: Tag) {
    this.poi.tags.push(tag);
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
