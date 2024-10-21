
export interface GenerationResponse {
  HID: string;
  message: string;
}


export interface GetGeneratedImage{
  HID: string;
  name: string;
  email: string;
  prompt: string;
  imagefilename: string;
  imageThumbnailfilename: string;
  Title: string;
  voteCount: number;
}