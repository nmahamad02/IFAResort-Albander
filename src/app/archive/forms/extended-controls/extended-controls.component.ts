import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MatChipInputEvent, MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-extended-controls',
  templateUrl: './extended-controls.component.html',
  styleUrls: ['./extended-controls.component.scss']
})
export class ExtendedControlsComponent implements OnInit {

  controlsForm: FormGroup;
  tags = ['Javascript', 'Angular', 'Ionic', 'CSS'];
  separatorKeysCodes = [COMMA, ENTER];

  // for the skills chips autocomplete
  prefilledSkills = ['Content Marketing', 'Web Design', 'SEO', 'Digital Marketing'];
  skills: string[] = ['Javascript'];
  filteredSkills: Observable<string[]>;
  @ViewChild('skillInput', {static: false}) skillInput: ElementRef<HTMLInputElement>;
  @ViewChild('skillsAutocomplete', {static: false}) matAutocomplete: MatAutocomplete;

  constructor(fb: FormBuilder) {
    this.controlsForm = fb.group({
      labelOnTop: new FormControl(''),
      labelOnSide: new FormControl(''),
      help: new FormControl(''),
      datepicker: new FormControl(),
      password: new FormControl(''),
      placeholder: new FormControl(''),
      disabled: new FormControl({value: 'I am a disabled input', disabled: true}),
      color: new FormControl('#53DBAA'),
      textarea: new FormControl(''),
      timepicker: new FormControl({hour: 13, minute: 35}),
      rating: new FormControl(3),
      readOnlyRating: new FormControl(4.5),
      validInput: new FormControl('Dayana'),
      validInput2: new FormControl('Dayana'),
      invalidInput: new FormControl(''),
      invalidInput2: new FormControl(''),
      username: new FormControl(''),
      budget: new FormControl(''),
      firstname: new FormControl(''),
      lastname: new FormControl(''),
      favouriteFood: new FormControl(''),
      checkbox1: new FormControl(true),
      checkbox2: new FormControl(false),
      checkbox3: new FormControl(false),
      checkbox4: new FormControl(false),
      checkbox5: new FormControl(true),
      checkbox6: new FormControl(true),
      checkbox7: new FormControl({value: true, disabled: true}),
      checkbox8: new FormControl({value: false, disabled: true}),
      checkbox9: new FormControl(true),
      buttonCheckbox1: new FormControl(false),
      buttonCheckbox2: new FormControl(true),
      buttonCheckbox3: new FormControl(false),
      radio1: new FormControl('two'),
      radio2: new FormControl('one'),
      radio3: new FormControl({value: 'one', disabled: true}),
      radio4: new FormControl('two'),
      buttonRadio: new FormControl('oranges'),
      tags: new FormControl(),
      skills: new FormControl(),
      bootstrapRange: new FormControl(40),
      materialRange: new FormControl(25),
      progressBar1: new FormControl(25),
      progressBar2: new FormControl(65),
      progressBar3: new FormControl(50),
      progressBar4: new FormControl(100),
      materialProgressBar1: new FormControl(50)
    });
  }

  ngOnInit() {
    this.filteredSkills = this.controlsForm.controls.skills.valueChanges
    .pipe(
      startWith(null as string),
      map((skill: string | null) => skill ? this._filterSkills(skill) : this.prefilledSkills.slice()
    ));
  }

  private _filterSkills(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.prefilledSkills.filter(skill => skill.toLowerCase().indexOf(filterValue) === 0);
  }

  addSkill(event: MatChipInputEvent): void {
     // Add skill only when MatAutocomplete is not open
     // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our skill
      if ((value || '').trim()) {
       this.skills.push(value.trim());
      }

      // Reset the input value
      if (input) {
       input.value = '';
      }

      this.controlsForm.controls.skills.setValue(null);
    }
   }

  selectSkill(event: MatAutocompleteSelectedEvent): void {
    this.skills.push(event.option.viewValue);
    this.skillInput.nativeElement.value = '';
    this.controlsForm.controls.skills.setValue(null);
  }

  removeSkill(skill: string): void {
    const index = this.skills.indexOf(skill);
    if (index >= 0) {
      this.skills.splice(index, 1);
    }
  }

  addTag(event: MatChipInputEvent): void {
      const input = event.input;
      const value = event.value;

      // Add our tag
      if ((value || '').trim()) {
       this.tags.push(value.trim());
      }

      // Reset the input value
      if (input) {
       input.value = '';
      }
   }

  removeTag(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

}
