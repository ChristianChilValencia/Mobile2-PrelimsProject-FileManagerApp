import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { FileManagerService } from '../services/file-manager.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  fileName: string = '';
  fileContent: string = '';
  filelist: { name: string, content: string, time?: number }[] = [];
  
  constructor(
    private actionSheetCtrl: ActionSheetController,
    private fileManagerService: FileManagerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.refreshFilelist();
    this.fileManagerService.currentFile$.subscribe(file => {
      if (file) {
        this.fileName = file.name;
        this.fileContent = file.content;
      }
    });
  }

  async createFile() {
    try {
      await this.fileManagerService.createFile(this.fileName, this.fileContent);
      alert('File created successfully!');
      this.refreshFilelist();
      this.router.navigate(['/notes']);
    } catch (error) {
      console.error('Error creating file', error);
    }
  }

  async saveFile() {
    try {
      await this.fileManagerService.saveFile(this.fileName, this.fileContent);
      alert('File saved successfully!');
      this.refreshFilelist();
      this.router.navigate(['/notes']);
    } catch (error) {
      console.error('Error saving file', error);
    }
  }

  newFile() {
    this.fileName = '';
    this.fileContent = '';
    alert('Ready to create a new file!');
  }

  async readFile(fileName: string) {
    try {
      await this.fileManagerService.readFile(fileName);
      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Error reading file', error);
    }
  }

  async deleteFile(fileName: string) {
    try {
      await this.fileManagerService.deleteFile(fileName);
      alert('File deleted successfully!');
      this.refreshFilelist();
    } catch (error) {
      console.error('Error deleting file', error);
    }
  }

  async refreshFilelist() {
    try {
      this.filelist = await this.fileManagerService.refreshFilelist();
    } catch (error) {
      console.error('Error reading directory', error);
    }
  }

  async presentActionSheet(fileName: string) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Options',
      buttons: [
        {
          text: 'Update File',
          icon: 'create',
          handler: () => {
            this.readFile(fileName);
          }
        },
        {
          text: 'Delete File',
          icon: 'trash',
          role: 'destructive',
          handler: async () => {
            await this.deleteFile(fileName);
          }
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
        }
      ]
    });
    await actionSheet.present();
  }
}