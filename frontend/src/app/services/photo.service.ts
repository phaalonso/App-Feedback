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

    const blob = await fetch(capturePhoto.webPath).then(r => r.blob());
    console.log(blob);

    this.photos.unshift({
      webViewPath: capturePhoto.webPath,
      format: capturePhoto.format
    });

    console.log('Fim do add', this.photos);
  }

  async clearPhotos() {
    this.photos = [];
  }
}
