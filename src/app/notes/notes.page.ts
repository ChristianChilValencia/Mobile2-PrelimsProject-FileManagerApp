import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { FileManagerService } from '../services/file-manager.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.scss'],
  standalone: false,
})
export class NotesPage implements OnInit, OnDestroy {
  filelist: { name: string, content: string, time?: number }[] = [];
  fileEventSubscription!: Subscription;

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private fileManagerService: FileManagerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.refreshFilelist();
    this.fileEventSubscription = this.fileManagerService.fileEvent$.subscribe(() => {
      this.refreshFilelist();
    });
  }

  ngOnDestroy() {
    if (this.fileEventSubscription) {
      this.fileEventSubscription.unsubscribe();
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
            this.fileManagerService.readFile(fileName);
            this.router.navigate(['/home']);
          }
        },
        {
          text: 'Delete File',
          icon: 'trash',
          role: 'destructive',
          handler: async () => {
            await this.fileManagerService.deleteFile(fileName);
            alert('File deleted successfully!');
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