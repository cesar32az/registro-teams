import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { ApiService } from './../../shared/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

export interface Subject {
  name: string;
}

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.css']
})

export class EditTeamComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('chipList', { static: true }) chipList;
  @ViewChild('resetTeamForm', { static: true }) myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  teamForm: FormGroup;
  subjectArray: Subject[] = [];
  SectioinArray: any = ['A', 'B', 'C', 'D', 'E'];

  ngOnInit() {
    this.updateBookForm();
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private actRoute: ActivatedRoute,
    private teamApi: ApiService
  ) {
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.teamApi.GetTeam(id).subscribe(data => {
      console.log(data.subjects)
      this.subjectArray = data.subjects;
      this.teamForm = this.fb.group({
        team_name: [data.team_name, [Validators.required]],
        lider_name: [data.lider_name, [Validators.required]],
        id_pubg: [data.id_pubg, [Validators.required]],
        team_email: [data.team_email, [Validators.required]],
        departamento: [data.departamento, [Validators.required]],
        discord: [data.discord, [Validators.required]],
        subjects: [data.subjects]
      })
    })
  }

  /* Reactive book form */
  updateBookForm() {
    this.teamForm = this.fb.group({
      team_name: ['', [Validators.required]],
      lider_name: ['', [Validators.required]],
      team_email: ['', [Validators.required]],
      id_pubg: ['', [Validators.required]],
      departamento: ['', [Validators.required]],
      discord: ['', [Validators.required]],
      subjects: [this.subjectArray],

    })
  }

  /* Add dynamics integrante */
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add integrante
    if ((value || '').trim() && this.subjectArray.length < 5) {
      this.subjectArray.push({ name: value.trim() })
    }
    // Reset input
    if (input) {
      input.value = '';
    }
  }

  /* Remove dynamic integrantes */
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

  /* Update form */
  updateTeamForm() {
    console.log(this.teamForm.value)
    var id = this.actRoute.snapshot.paramMap.get('id');
    if (window.confirm('Estas seguro de actualizar los datos del team?')) {
      this.teamApi.UpdateTeam(id, this.teamForm.value).subscribe( res => {
        this.ngZone.run(() => this.router.navigateByUrl('/teams-list'))
      });
    }
  }

}
