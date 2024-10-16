
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
}

export interface GetGeneratedImageItem{
  hid: string;
  name: string;
  email: string;
  prompt: string;
  imagefilename: string;
  imageThumbnailfilename: string;
  createDatetime: string;
  updateDatetime: string;
  url: string;
  id: number;
  likesAmount?: number;
  onClose: () => void;
}

export interface GetGeneratedImageList{
  images: GetGeneratedImageItem[];
  message: string;
}