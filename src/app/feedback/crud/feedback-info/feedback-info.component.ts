import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  injectMutation,
  injectQuery,
} from '@tanstack/angular-query-experimental';
import { QUERYKEYS } from 'src/app/queries';
import { FeedbackService } from '../../feedback.service';
import { ReplyToFeedBackType } from '../../types';

@Component({
  selector: 'app-feedback-info',
  templateUrl: './feedback-info.component.html',
  styleUrls: ['./feedback-info.component.css'],
})
export class FeedbackInfoComponent {
  constructor(private route: ActivatedRoute) {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    console.log(this.id);
  }
  id: number;
  feedbackService = inject(FeedbackService);
  emailReplyBody = '';

  query = injectQuery(() => ({
    queryKey: [QUERYKEYS.feedback, this.id],
    queryFn: () => this.feedbackService.getAllFeedbackById(this.id),
    enabled: !!this.id,
  }));

  mutation = injectMutation((queryClient) => ({
    mutationFn: async (replyToFeedBack: ReplyToFeedBackType) => {
      this.feedbackService.replyToFeedBack(replyToFeedBack);
    },
    onSuccess: () => {
      alert('Replied Successfully');
      queryClient.refetchQueries({ queryKey: [QUERYKEYS.allfeedback] });
      queryClient.refetchQueries({ queryKey: [QUERYKEYS.feedback, this.id] });
    },
  }));

  async onSendReply() {
    await this.mutation.mutateAsync({
      feedbackData: this.feedback,
      emailReplyBody: this.emailReplyBody,
    });
  }

  get isLoading() {
    return this.query.isLoading();
  }

  get isError() {
    return this.query.isError();
  }

  get errorMessage() {
    console.log(this.query.error());
    return this.query.error || 'An error occurred while fetching data.';
  }

  get feedback() {
    console.log(this.query.data());
    return this.query.data()!;
  }
}
