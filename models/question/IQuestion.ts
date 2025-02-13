export interface IQuestion {
  question: string;
  answer: IAnswer[];
}

interface IAnswer {
  title: string;
  image: string;
  point: Number;
}
