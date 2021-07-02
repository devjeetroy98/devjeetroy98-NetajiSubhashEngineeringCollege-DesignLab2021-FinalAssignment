import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import { SnackbarNotifyService } from '../snackbar-notify.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private _authService: AuthServiceService, private _router: Router, private route: ActivatedRoute, private _snack: SnackbarNotifyService) { }
  // @ViewChild('paginator') paginator: any;
  
  public dataSource : any = [] 
  public displayedColumns:any = []
  public fdataSource:any = []
  ngOnInit(): void {

    this._authService.getProfiles().subscribe((res:any)=>{
      console.log(res)
      if(res.payload[0]){
        this.dataSource = res.payload
      }else{
        this.dataSource = []
      }
    })
    this.displayedColumns= ['profile','name', 'email', 'dob', 'button'];
    // this.dataSource.paginator = this.paginator;
  }
}
