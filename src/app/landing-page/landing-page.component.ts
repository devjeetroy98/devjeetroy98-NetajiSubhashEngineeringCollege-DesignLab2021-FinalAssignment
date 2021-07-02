import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule,ReactiveFormsModule, FormBuilder, Validators, FormArray  } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service'
import { Router, ActivatedRoute } from '@angular/router';
import { SnackbarNotifyService } from '../snackbar-notify.service'
// import { MatFormFieldModule } from '@angular/material/form-field'; 
// import { MatInputModule } from '@angular/material/input';
// import { MatButtonModule } from '@angular/material/button';
// import { MatIconModule } from '@angular/material/icon';
// import {MatSelectModule} from '@angular/material/select';
// import { MatToolbarModule } from '@angular/material/toolbar';
// import {MatTableModule} from '@angular/material/table';
// import {MatDialogModule} from '@angular/material/dialog';
// import {MatTabsModule} from '@angular/material/tabs';
// import {MatCardModule} from '@angular/material/card';
// import {MatBadgeModule} from '@angular/material/badge';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor(private _authService: AuthServiceService, private _router: Router, private route: ActivatedRoute, private _snack: SnackbarNotifyService) { }

  public signUpForm:any = []

  ngOnInit(): void {

    this.signUpForm = new FormGroup({
      username : new FormControl(this.signUpForm.username,{
        validators: [Validators.required]
      }),
      email: new FormControl(this.signUpForm.email,{
        validators: [Validators.required, Validators.email]
      }),
      password : new FormControl(this.signUpForm.password,{
        validators: [Validators.required, Validators.min(7)]
      }),
      confirmpassword : new FormControl(this.signUpForm.confirmpassword,{
        validators: [Validators.required, Validators.min(7)]
      }),
    })


  }

  public password_mismatch: any = ""
  public onSubmit(){
    let userdata = this.signUpForm.value
    if(this.signUpForm.value["password"] === this.signUpForm.value['confirmpassword'] ){
    this._authService.registerUser(userdata).subscribe((res:any)=>{
          this._router.navigate(['/login'], { relativeTo: this.route }).then(()=>{
            this._snack.openSnackBar("User registered successfully!", "Close");
          });
        })
    } else{
      this.password_mismatch = "Password and Confirm Password doesn't match!"
      this.signUpForm.reset()
    }
   
  }
}
