import { Injectable } from '@angular/core';
import { CameraResultType, CameraSource, Plugins } from '@capacitor/core';

const { Camera } = Plugins

export interface Photo {
  webViewPath: string;
  format: string;
}

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  public photos: Photo[] = [];

  constructor() { }

  async addNewToGallery() {
    const capturePhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });

    console.log(capturePhoto);
    
    const glob = await fetch(capturePhoto.webPath).then(r => r.blob());
    console.log(glob);
    
    this.photos.unshift({
      webViewPath: capturePhoto.path,
      format: capturePhoto.format
    });

    console.log(this.photos[0]);
  }

  async clearPhotos() {
    this.photos = [];
  }
}
