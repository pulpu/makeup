import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ServerService } from '../../../server.service';
import { Item } from '../../../item';
import { Subscription } from 'rxjs';

import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { finalize } from 'rxjs/operators';

// You don't need to import firebase/app either since it's being imported above


import { ImageCroppedEvent } from './image-cropper/interfaces/image-cropped-event.interface';
import { ImageCropperComponent } from './image-cropper/image-cropper.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  database : Observable<any>;
  paragraphs : Observable<any>;
  items : Observable<any>;
  category : string;
  language: string;
  subscription: Subscription;
  categorypath: any;

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadState: Observable<string>;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;
  fileName: string;
  acceptImage = false;
  theImageIsLoaded: boolean = false;
  aspectRatioChecked: boolean = false;



  arr: Item[] = [];
  model = { id:'',order:'', agency: '', company: '', kind: 'photographer', authour: '', orientation:'',img:'', smallImg:'' };

  imageChangedEvent: any = '';
  croppedImage: any = '';
  showCropper = false;
  aspectRatioValue: number = 3/4;

  @ViewChild(ImageCropperComponent) imageCropper: ImageCropperComponent; // de vericat ce nu functineaza aici


  constructor(
    private serverservice: ServerService,
    private route: ActivatedRoute,
    private storage: AngularFireStorage) { }

    ngOnInit() {

      //this is a subscribe to the page path change
      this.route.params.subscribe(
        (params: Params) => {
          this.category = params['category'];
          this.language = params['language'];
  
          this.category = this.route.snapshot.params['category']    // here I take the page categori form the page path
  
         //here I give to de sever service the page categori to make the selection in db
          this.paragraphs = this.serverservice.getData(this.category, 'paragraph');
          this.database = this.serverservice.getData(this.category, 'items');
  
          this.serverservice.getItems(this.category).subscribe(
            (item: Item[]) => {
              this.arr = item;
             this.model.order = String(this.arr.length + 1) 
          });
  
          //make the selection for paragraph
          this.paragraphs.subscribe(result => {
            return result.map(paragraph=>{
              return this.paragraphs = paragraph.paragraph
            })
          })
        }
      )
    }


    urlParser(url){
      if(typeof url !== 'undefined') {
        const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        let match = url.match(regExp);
        if (match&&match[7].length==11){
            let youtubeID=match[7];
            return 'https://img.youtube.com/vi/'+ youtubeID + '/hqdefault.jpg'
        }else{
            return url;
        }
      } else {
        return '';
      }
    }

    // ** start ** this is for admim page to add new items
  itemSubmit() {
    this.serverservice.addItem(this.model, this.category);
  }
  onDelete(item) {
    this.serverservice.deleteItem(item, this.category);
  }

  addImageInFirebase():boolean {
    if(typeof this.croppedImage !== 'undefined') {
      var self = this;
      var base64result = this.croppedImage.split(',')[1];
    const file = Math.random().toString(36).substring(2) + '__' + this.fileName['name'];
        this.ref = this.storage.ref('/images').child(file)
        this.ref.putString(base64result, 'base64', {contentType:'image/jpg'}).then(function(snapshot) {
          console.log('Uploaded a base64 string!');
          self.task.snapshotChanges().pipe(
            finalize(() => {
              self.ref.getDownloadURL().subscribe(url => {  
                self.model.smallImg = url;
              },(error) => {
                // Handle error here
                // Show popup with errors or just console.error
                console.log(error);}
              );
            })
          ).subscribe();
        });
    }
    this.acceptImage = true
    return this.acceptImage
  }

  fileChangeEvent(event: any): void {
      this.imageChangedEvent = event;
      var countEvent = 0;
      if(countEvent === 0) {
        this.fileName = event.target.files[0];
        this.theImageIsLoaded = true;
      }
  }

  uploadOriginalImage(event) {
    if(event.target.checked){
      this.ref = this.storage.ref('images/' + this.fileName['name']);
      this.task = this.ref.put(this.fileName);
      this.uploadState = this.task.snapshotChanges().pipe(map(s => s.state));
      this.uploadProgress = this.task.percentageChanges();
      this.task.snapshotChanges().pipe(
        finalize(() => {
          this.ref.getDownloadURL().subscribe(url => {
            this.model.img = url;
          });
        })
      ).subscribe();
    }
    
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded() {
    this.showCropper = true;
    // this.model.img = this.imageCropper['originalBase64'];
     console.log('Image loaded')
  }
  cropperReady() {
    console.log('Cropper ready')
  }
  loadImageFailed () {
    console.log('Load failed');
  }
  rotateLeft() {
    this.imageCropper.rotateLeft();
  }
  rotateRight() {
    this.imageCropper.rotateRight();
  }
  flipHorizontal() {
    this.imageCropper.flipHorizontal();
  }
  flipVertical() {
    this.imageCropper.flipVertical();
  }

  aspectRatio(value: string): void {
    this.aspectRatioValue = Number(value);
    this.model.orientation = value;
    this.aspectRatioChecked = true;
  }

// ** end **//
}
