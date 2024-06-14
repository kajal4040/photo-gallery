import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { PhotoGalleryComponent } from './photo-gallery.component';
import { PhotoService } from '../photo.service';
describe('PhotoGalleryComponent', () => {
  let component: PhotoGalleryComponent;
  let fixture: ComponentFixture<PhotoGalleryComponent>;
  let photoService: PhotoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PhotoGalleryComponent],
      imports: [HttpClientTestingModule],
      providers: [PhotoService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoGalleryComponent);
    component = fixture.componentInstance;
    photoService = TestBed.inject(PhotoService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch photos on init', () => {
    const dummyPhotos = [
      {
        albumId: 1,
        id: 1,
        title: 'photo 1',
        url: 'http://placehold.it/600/92c952',
        thumbnailUrl: 'http://placehold.it/150/92c952',
      },
      {
        albumId: 1,
        id: 2,
        title: 'photo 2',
        url: 'http://placehold.it/600/771796',
        thumbnailUrl: 'http://placehold.it/150/771796',
      },
    ];

    spyOn(photoService, 'getPhotos').and.returnValue(of(dummyPhotos));

    component.ngOnInit();

    expect(component.photos.length).toBe(2);
    expect(component.photos).toEqual(dummyPhotos);
  });
});
