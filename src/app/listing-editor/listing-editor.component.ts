import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators  } from '@angular/forms';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

@Component({
  selector: 'app-listing-editor',
  templateUrl: './listing-editor.component.html',
  styleUrls: ['./listing-editor.component.css']
})
export class ListingEditorComponent implements OnInit {
  myForm: FormGroup;

  // Form state
  loading = false;
  success = false;

  constructor(
    private fb: FormBuilder,
    private afs: AngularFirestore) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      items: this.fb.array([])
    });
    
  }

  get itemsForm() {
    return this.myForm.get('items') as FormArray
  }

  addItem() {
    const item = this.fb.group({
        agency: ['',[
          Validators.required,
        ]],
        company: [''],
        director:[''],
        img: [''],
        kind: [''],
        orientation: [''],
        photographer: [''],
        smallImg:['']
    })

    this.itemsForm.push(item);

  }

  deleteItem(i) {
    this.itemsForm.removeAt(i)
  }

  async submitHandler() {
    this.loading = true;

    const test = this.myForm.value;

    try {
      await  this.afs.collection('test').doc('category').update(test);
      this.success = true;
    } catch(err) {
      console.error(err)
    }

    this.loading = false;
  }


}
