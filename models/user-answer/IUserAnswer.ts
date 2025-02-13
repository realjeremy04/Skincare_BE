export interface IUserAnswer {
  accountId: string;
  scoreBandId: string;
  totalPoint: Number;
  answers: [
    {
      questionId: string;
      selectedAnswers: [string];
    }
  ];
}
