import { Injectable } from '@angular/core';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileManagerService {
  private fileEventSubject = new Subject<void>();
  fileEvent$ = this.fileEventSubject.asObservable();

  private currentFileSubject = new BehaviorSubject<{ name: string, content: string } | null>(null);
  currentFile$ = this.currentFileSubject.asObservable();

  emitFileEvent() {
    this.fileEventSubject.next();
  }

  setCurrentFile(file: { name: string, content: string }) {
    this.currentFileSubject.next(file);
  }

  async createFile(fileName: string, fileContent: string) {
    const base64Content = btoa(fileContent);
    await Filesystem.writeFile({
      path: fileName,
      data: base64Content,
      directory: Directory.Documents,
    });
    this.emitFileEvent();
  }

  async saveFile(fileName: string, fileContent: string) {
    const base64Content = btoa(fileContent);
    await Filesystem.writeFile({
      path: fileName,
      data: base64Content,
      directory: Directory.Documents,
    });
    this.emitFileEvent();
  }

  async readFile(fileName: string) {
    const contents = await Filesystem.readFile({
      path: fileName,
      directory: Directory.Documents,
    });
    const fileContent = atob(contents.data as string);
    this.setCurrentFile({ name: fileName, content: fileContent });
    return fileContent;
  }

  async deleteFile(fileName: string) {
    await Filesystem.deleteFile({
      path: fileName,
      directory: Directory.Documents,
    });
    this.emitFileEvent();
  }

  async refreshFilelist() {
    const result = await Filesystem.readdir({
      path: '',
      directory: Directory.Documents,
    });
    const filelist = [];
    for (const file of result.files) {
      const contents = await Filesystem.readFile({
        path: file.name,
        directory: Directory.Documents,
      });
      const stat = await Filesystem.stat({
        path: file.name,
        directory: Directory.Documents,
      });
      filelist.push({ name: file.name, content: atob(contents.data as string), time: stat.mtime });
    }
    filelist.sort((a, b) => (b.time || 0) - (a.time || 0));
    return filelist;
  }
}
