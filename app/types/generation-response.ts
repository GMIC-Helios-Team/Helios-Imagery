
export interface GenerationResponse {
  HID: string;
  message: string;
}


export interface GetGeneratedImage{
  _id: string;
  HID: string;
  name: string;
  email: string;
  prompt: string;
  imagefilename: string;
  imageThumbnailfilename: string;
  voteCount: number;
  Title: string;
  SendGridMessageId: string;
  createDatetime: string;
  updateDatetime: string;
  EmailSentDateTime: string;
}