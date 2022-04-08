import { Component } from "@angular/core";
import { FileUpload } from "./file.upload.model";
import { UploadService } from "../../services/upload.service";

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})

export class FileUploadComponent {

  selectedFiles?: FileList;
  selectedFile!: File;
  currentFileUpload?: FileUpload;
  percentage = 0;
  isHovering!: boolean;

  constructor(private uploadService: UploadService) { /* ∅ */ }
 
  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  /**
   * KEEPING THIS FUNCTION MOSTLY FOR MOBILE VIEW
   */
  upload(): void {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined;
      if (file) {
        this.selectedFile = file;
        this.currentFileUpload = new FileUpload(file);
        this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(
          success => { }
        );
      }
    }
  }


  toggleHover(event: any) {
    this.isHovering = event;
  }

  onDrop(event: any) {
    if (event[0]) {
      const selectedFile: File = event[0];
      this.currentFileUpload = new FileUpload(selectedFile);

      this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(
        success => { }
      );

    }
  }
}
