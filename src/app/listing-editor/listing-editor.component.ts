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

  get itemForms() {
    return this.myForm.get('items') as FormArray
  }

  addItem() {
    const item = this.fb.group({
        agency: ['',[
          Validators.required,
        ]],
        company: [''],
    })

    this.itemForms.push(item);

  }

  deleteItem(i) {
    this.itemForms.removeAt(i)
  }

  async submitHandler() {
    this.loading = true;

    const test = this.myForm.value;

    try {
      await  this.afs.collection('data/cover/items').doc('s85rC8poUEd9y4sSbfyS').update(test);
      this.success = true;
    } catch(err) {
      console.error(err)
    }

    this.loading = false;
  }


}
