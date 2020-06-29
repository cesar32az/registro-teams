import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { ApiService } from './../../shared/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

export interface Subject {
  name: string;
}

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})

export class AddTeamComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('chipList', { static: true }) chipList;
  @ViewChild('resetTeamForm', { static: true }) myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  teamForm: FormGroup;
  subjectArray: Subject[] = [];
  //SectioinArray: any = ['A', 'B', 'C', 'D', 'E'];

  ngOnInit() {
    this.submitBookForm();
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private teamApi: ApiService
  ) { }

  /* Reactive book form */
  submitBookForm() {
    this.teamForm = this.fb.group({
      team_name: ['', [Validators.required]],
      lider_name: ['', [Validators.required]],
      id_pubg: ['', [Validators.required]],
      team_email: ['', [Validators.required]],
      departamento: ['', [Validators.required]],
      discord:['', [Validators.required]],
      subjects: [this.subjectArray],

      //section: ['', [Validators.required]],
      //dob: ['', [Validators.required]],
    })
  }
  //this.TeamData.id_team = this.TeamData.length + 1;


  /* Agregar integrantes dinamicos */
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // agrega integrante
    if ((value || '').trim() && this.subjectArray.length < 5) {
      this.subjectArray.push({ name: value.trim() })
    }
    // Reset input
    if (input) {
      input.value = '';
    }
  }

  /* remover integrantes */
  remove(subject: Subject): void {
    const index = this.subjectArray.indexOf(subject);
    if (index >= 0) {
      this.subjectArray.splice(index, 1);
    }
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.teamForm.controls[controlName].hasError(errorName);
  }

  /* Submit  */
  submitTeamForm() {
    if (this.teamForm.valid) {
      this.teamApi.AddTeam(this.teamForm.value).subscribe(res => {
        this.ngZone.run(() => this.router.navigateByUrl('/teams-list'))
      });
    }
  }

}
