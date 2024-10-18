export interface Gallery {
  items: GalleryItem[];
  totalCount: number;
}

export interface GalleryItem {
  HID: string;
  name: string;
  email: string;
  prompt: string;
  imagefilename: string;
  imageThumbnailfilename: string;
  voteCount: number;
}
