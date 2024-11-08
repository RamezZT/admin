import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OffersService } from '../../offers.service'; // Adjust the import path
import {
  injectMutation,
  injectQuery,
} from '@tanstack/angular-query-experimental';
import { QUERYKEYS } from 'src/app/queries';
import { Offer } from 'src/types';
import { LibraryService } from 'src/app/admin/library/library.service';

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.css'],
})
export class AddOfferComponent {
  offerForm: FormGroup;

  offersService = inject(OffersService);
  librariesService = inject(LibraryService);

  constructor(private fb: FormBuilder) {
    // Initialize form with validation
    this.offerForm = this.fb.group({
      offerpercentage: [
        '',
        [Validators.required, Validators.min(0), Validators.max(100)], // Min and max validators
      ],
      libraryid: ['', Validators.required],
    });
  }

  libraryQuery = injectQuery(() => ({
    queryKey: [QUERYKEYS.libraries],
    queryFn: async () => await this.librariesService.getAllLibraries(),
  }));

  mutation = injectMutation((client) => ({
    mutationFn: (newOffer: Offer) => this.offersService.createOffer(newOffer),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [QUERYKEYS.alloffers] });
      alert('Offer created successfully');
    },
  }));

  // Submit the new offer data
  onCreateOffer() {
    if (this.offerForm.valid) {
      this.mutation.mutate(this.offerForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
