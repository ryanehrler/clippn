import { Injectable } from '@angular/core';

@Injectable()
export class FileStorageService {
  files = {};

  constructor() {}

  addFile(file: File) {
    this.files[file.name] = file;
  }

  getFile(name: string) {
    return this.files[name];
  }
}
