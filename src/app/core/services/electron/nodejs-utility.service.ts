import { Injectable } from '@angular/core';
import { NodejsService } from './nodejs.service';

@Injectable({
  providedIn: 'root'
})
export class NodejsUtilityService {
  constructor(private nodejsService: NodejsService) {}

  getFileName(path: string) {
    const extension = this.getExtension(path);
    return this.nodejsService.path.basename(path, extension);
  }
  getExtension(path: string) {
    return this.nodejsService.path.extname(path);
  }
  getLocalAppDataFolder() {
    let path = '';
    if(this.nodejsService.os) {
      path = this.nodejsService.os.tmpdir();
    }

    console.log('tmpdir: ', path);
    return path + '\\clippn\\';
  }
}
