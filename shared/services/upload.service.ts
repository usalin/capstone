import { Injectable } from '@angular/core';
import { finalize, Observable, of } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FileUpload } from '../components/file-upload/file.upload.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private basePath = '/uploads';
  private imageUrl!: string;
  constructor(private storage: AngularFireStorage, private http: HttpClient) { }


  pushFileToStorage(fileUpload: FileUpload): Observable<any> {
    const filePath = `${this.basePath}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          this.imageUrl = downloadURL;
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
        });
      })
    ).subscribe();
    return of(this.imageUrl);
  }



}