import { Component } from "@angular/core";
import { FileUpload } from "./file.upload.model";
import { UploadService } from "./upload.service";

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
  constructor(private uploadService: UploadService) { }
  ngOnInit(): void {
  }
  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }
  upload(): void {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined;
      if (file) {

        this.selectedFile = file;
        this.currentFileUpload = new FileUpload(file);
        this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(
            error => {
            console.log(error);
          }
        );
      }
    }
  }
   
}
