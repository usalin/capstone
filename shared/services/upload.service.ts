import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, Observable, Subject, tap } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FileUpload } from '../components/file-upload/file.upload.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private basePath = '/uploads';
  private imageUrl!: string;

  private uploadedFilePath = new BehaviorSubject<string | null>(null);
  filePath$ = this.uploadedFilePath.asObservable();

  constructor(private storage: AngularFireStorage, private http: HttpClient) { }


  pushFileToStorage(fileUpload: FileUpload): Observable<number | undefined> {
    const filePath = `${this.basePath}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          localStorage.setItem('imageUrl', downloadURL);
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
        });
      })
    ).subscribe();
    return uploadTask.percentageChanges();
  }

   getFilePath() {
     return this.uploadedFilePath.value;
   }


}