import { Team } from './../../shared/team';
import { ApiService } from './../../shared/api.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-teams-list',
  templateUrl: './teams-list.component.html',
  styleUrls: ['./teams-list.component.css']
})

export class TeamsListComponent implements OnInit {
  TeamData: any = [];
  dataSource: MatTableDataSource<Team>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  displayedColumns: string[] = ['_id', 'team_name','discord','departamento',  'action'];

  constructor(private teamApi: ApiService) {
    this.teamApi.GetTeams().subscribe(data => {
      this.TeamData = data;
      this.dataSource = new MatTableDataSource<Team>(this.TeamData);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    })
  }

  ngOnInit() { }

  deleteTeam(index: number, e){
    if(window.confirm('Estas seguro de eliminar elteam :c ')) {
      const data = this.dataSource.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
      this.dataSource.data = data;
      this.teamApi.DeleteTeam(e._id).subscribe()
    }
  }

}


