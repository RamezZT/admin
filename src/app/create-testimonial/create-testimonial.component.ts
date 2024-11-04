import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TestimonialService } from '../Services/testimonial.service';

@Component({
  selector: 'app-create-testimonial',
  templateUrl: './create-testimonial.component.html',
  styleUrls: ['./create-testimonial.component.css']
})
export class CreateTestimonialComponent {
  testimonialForm: FormGroup;
  tempRating: number | null = null;
  id:any | null;

  constructor(private testimonialServ: TestimonialService) {
    this.id=localStorage.getItem('userid');
    this.testimonialForm = new FormGroup({
      message: new FormControl('', Validators.required),
      rate: new FormControl(0, [Validators.required, Validators.min(1), Validators.max(5)]),
      userid: new FormControl(this.id)
    });
  }

  setRating(rating: number) {
    this.testimonialForm.patchValue({ rate: rating });
  }

  onSubmit() {
    if (this.testimonialForm.valid) {
      console.log(this.testimonialForm.value);
      this.testimonialServ.AddTestimonial(this.testimonialForm.value);
      this.testimonialForm.patchValue({
        message: '',
        rate:''
      });     
    }
  
  }
}
