import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddTeamComponent } from './components/add-team/add-team.component';
import { EditTeamComponent } from './components/edit-team/edit-team.component';
import { TeamsListComponent } from './components/teams-list/teams-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'add-team' },
  { path: 'add-team', component: AddTeamComponent },
  { path: 'edit-team/:id', component: EditTeamComponent },
  { path: 'teams-list', component: TeamsListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
