import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { NotificationTemplateComponent } from 'src/app/archive/shared/notification-template/notification-template.component';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent {
  uploaders = {
    avatar: {
      progress: undefined,
      url: undefined
    },
    image: {
      progress: undefined,
      url: undefined
    },
    files: {
      list: [],
      invalidList: []
    }
  };

  constructor(public snackBar: MatSnackBar) {}

  onMultipleChange(event: any, uploader: string): void {
    this.onDropzoneMultipleChange(event.target.files, uploader);
  }

  onSingleChange(event: any, uploader: string): void {
    this.onDropzoneSingleChange(event.target.files, uploader);
  }

  onDropzoneMultipleChange(fileList: Array<File>, uploader: string): void {
    for (const file of fileList) {
      const l = this.uploaders[uploader].list.push(file);
      this.read(file, this.uploaders[uploader].list[l - 1]);
    }
  }

  onInvalidFiles(files: Array<File>): void {
    // this files are invalid because their extension is not allowed on this control
    this.snackBar.openFromComponent(NotificationTemplateComponent, {
      data: {
        message: 'The files are not supported by this control',
        icon: 'exclamation-triangle',
        type: 'danger',
        dismissible: true
      },
      duration: 3000,
      horizontalPosition: 'start',
      verticalPosition: 'top',
      panelClass: ['notification-wrapper']
    });
  }

  onDropzoneSingleChange(files: Array<File>, uploader: string): void {
    this.uploaders[uploader] = files[0];
    this.read(files[0], this.uploaders[uploader]);
  }

  resetUploader(uploader: string): void {
    if (uploader === 'files') {
      this.uploaders[uploader] = {
        list: [],
        invalidList: []
      };
    } else {
      this.uploaders[uploader] = {};
    }
  }

  post(): void {
    this.snackBar.openFromComponent(NotificationTemplateComponent, {
      data: {
        message: 'Your file has been uploaded successfully',
        icon: 'check-circle',
        type: 'success',
        dismissible: true
      },
      duration: 3000,
      horizontalPosition: 'start',
      verticalPosition: 'top',
      panelClass: ['notification-wrapper']
    });

    setTimeout(() => {
      this.resetUploader('image');
    }, 600);
  }

  read(file: File, store: any): void {
    store.total = (file.size / 1024).toFixed(2);
    store.progress = 0;
    store.loaded = 0;
    const reader = new FileReader();

    reader.onload = (e: any) => {
      store.url = e.target.result;
    };

    reader.onprogress = (e: ProgressEvent) => {
      if (e.lengthComputable) {
        store.progress = Math.round((e.loaded / e.total) * 100);
        store.loaded = (e.loaded / 1024).toFixed(2);
      }
    };

    reader.readAsDataURL(file);
  }
}
