import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule,ReactiveFormsModule, FormBuilder, Validators, FormArray  } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import { SnackbarNotifyService } from '../snackbar-notify.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit {

  constructor(private _authService: AuthServiceService, private _router: Router, private route: ActivatedRoute, private _snack: SnackbarNotifyService) { }


  public LoginForm:any = []

  ngOnInit(): void {

    this.LoginForm = new FormGroup({
      email: new FormControl(this.LoginForm.email,{
        validators: [Validators.required, Validators.email]
      }),
      password : new FormControl(this.LoginForm.password,{
        validators: [Validators.required, Validators.min(7)]
      }),
    })

  }

  public onSubmit(){
    let userdata = this.LoginForm.value
    this._authService.LoginUser(userdata).subscribe((res:any)=>{
      if(res.User != null){
        this._router.navigate(['/dashboard'], { relativeTo: this.route }).then(()=>{
          this._snack.openSnackBar("User loggedin successfully!", "close");
          console.log(res.data)
        });
      }else{
        this._snack.openSnackBar(`${res.Status}`, "close");
      }
      
    })
  }

}
