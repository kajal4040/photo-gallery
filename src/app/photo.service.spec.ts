import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { PhotoService } from './photo.service';

describe('PhotoService', () => {
  let service: PhotoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PhotoService],
    });
    service = TestBed.inject(PhotoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should fetch photos', () => {
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

    service.getPhotos().subscribe((photos) => {
      expect(photos.length).toBe(2);
      expect(photos).toEqual(dummyPhotos);
    });

    const request = httpMock.expectOne(
      'https://jsonplaceholder.typicode.com/photos'
    );
    expect(request.request.method).toBe('GET');
    request.flush(dummyPhotos);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
