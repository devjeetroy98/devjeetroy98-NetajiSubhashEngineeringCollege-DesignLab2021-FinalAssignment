import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import { SnackbarNotifyService } from '../snackbar-notify.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  public multipleImages: any = [];
  public urls: any =  [];

  constructor(private _authService: AuthServiceService, private _router: Router, private route: ActivatedRoute, private _snack: SnackbarNotifyService) { }

  public profileForm: any=[]
  ngOnInit(): void {

    this.profileForm = new FormGroup({
      picture : new FormControl(this.profileForm.username,{
        validators: [Validators.required]
      }),
      name: new FormControl(this.profileForm.name,{
        validators: [Validators.required, Validators.email]
      }),
      email : new FormControl(this.profileForm.password,{
        validators: [Validators.required, Validators.min(7)]
      }),
      dob: new FormControl(this.profileForm.confirmpassword,{
        validators: [Validators.required, Validators.min(7)]
      }),
    })
  }

  public onSubmit(){
    let data = this.profileForm.value
    var formData = new FormData()
    formData.append("picture", this.multipleImages)
    for(let key of Object.keys(this.profileForm.value)){
      if(key != "picture"){
        formData.append(key, this.profileForm.value[key])
      }
    }
    this._authService.PostProfile(formData).subscribe((res:any)=>{
      this._router.navigate(['/dashboard'], { relativeTo: this.route }).then(()=>{
        this._snack.openSnackBar(`${res.Status}`, "Close");
      });
    })
  }

 public selectPics(event:any){
    const files: FileList = event.target.files;
    if(event.target.files[0]){
      this.multipleImages = event.target.files[0]
        let reader = new FileReader()
        reader.readAsDataURL(files[0])
        reader.onload = (event: any) =>{
          this.urls.push(event.target.result)
          console.log(this.urls)
        }
    }
  }

// Delete a particular picture from the uploaded list.
public removeItem(id:number){
  this.urls = []
  this.multipleImages = []
}
}
