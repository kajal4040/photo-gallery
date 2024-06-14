import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../photo.service';

@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.scss'],
})
export class PhotoGalleryComponent implements OnInit {
  photos: any[] = [];

  constructor(private photoService: PhotoService) {}

  ngOnInit(): void {
    this.photoService.getPhotos().subscribe((data) => {
      this.photos = data;
    });
  }
}
