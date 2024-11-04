import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  id: string | null = '';

  constructor(public User: UserService) {}

  ngOnInit() {
    this.id = localStorage.getItem('userid');
    if (this.id) {
      this.User.getUserbyId(this.id);
      
      // استخدام setInterval لمراقبة بيانات المستخدم
      const interval = setInterval(() => {
        if (this.User.user && this.User.user.userid) {
          this.UpdateUser.patchValue({
            userid: this.User.user.userid,
            firstname: this.User.user.firstname,
            lastname: this.User.user.lastname,
            email: this.User.user.email,
            phonenumber: this.User.user.phonenumber,
            address: this.User.user.address
          });
          clearInterval(interval); // إيقاف المراقبة بعد تعيين القيم
        }
      }, 100); // تحقق كل 100 مللي ثانية
    }
  }

  UpdateUser = new FormGroup({
    userid: new FormControl(),
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phonenumber: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required)
  });

  UpdateData() {
    if (this.UpdateUser.valid) {
       this.User.updateUser(this.UpdateUser.value);
      console.log(this.UpdateUser.value);
      window.location.reload();
    } else {
      console.log('Form is invalid');
    }
  }

  // id: any | null = '';
  // constructor(public User:UserService) {}


  // ngOnInit() {
      
  //     this.id = localStorage.getItem('userid');
  //     this.User.getUserbyId(this.id);
     
      
  // }
  



  
 
   

  

  // UpdateUser = new FormGroup({
  //   userid:new FormControl(),
  //   firstname: new FormControl(this.User.user.firstname,[Validators.required]),
  //   lastname: new FormControl([Validators.required]),

  //   email: new FormControl([Validators.required,Validators.email]),
  //   phonenumber: new FormControl([Validators.required]),
    
  //   address: new FormControl([Validators.required])
  //   // username: new FormControl([Validators.required]),
  //   // password: new FormControl([Validators.required])
    

  // });

  
  // UpdateData(){
  //   // this.User.updateUser(this.UpdateUser.value)
  //   console.log(this.UpdateUser.value);
   
  // }

  
  
  // photo: File | null = null;
  // profilePic: string | null = null;

  // onFileChange(event: any) {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       this.profilePic = e.target?.result as string;
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }

  // submitForm() {
  //   const formData = {
  //     photo: this.photo
  //   };
  //   console.log(formData);
  // }







  selectedFile: File | null = null;
  previewUrl: string | null = null; // متغير لتخزين عنوان الصورة


  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewUrl = e.target.result; // تخزين عنوان الصورة
      };
      reader.readAsDataURL(file); // قراءة الملف كعنوان بيانات
    }
  }

  upload() {
    if (this.selectedFile && this.id) {
      this.User.uploadImage(this.id, this.selectedFile).subscribe(
        (response) => {
          console.log('Upload successful:');
          this.previewUrl = null; // إعادة تعيين المعاينة بعد النجاح
        window.location.reload(); // إعادة تحميل الصفحة بعد رفع الصورة
        },
        (error) => {
          console.error('Upload failed:', error);
        }
      );
    }
    
  }
  }
