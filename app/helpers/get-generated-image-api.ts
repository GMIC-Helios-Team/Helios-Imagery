import { GetGeneratedImage } from '@/types/generation-response';

export const fetchImage = async (HID: string): Promise<GetGeneratedImage> => {

    const url = new URL('/api/generate-image', window.location.origin);
    url.searchParams.append('HID', HID);

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Get generated image request failed');
    }
    
    return response.json();
};

export const genImageList: GetGeneratedImage[] = [
  {
    HID: "1",
    name: "Ankit",
    email: "",
    prompt: "Alter Ego",
    imagefilename: "/AlterEgoImages/Ankit_AlterEgo.jpeg",
    imageThumbnailfilename: "/AlterEgoImages/Ankit_AlterEgo.jpeg",
    voteCount: 0
  },
  {
    HID: "2",
    name: "Ryan",
    email: "",
    prompt: "Alter Ego",
    imagefilename: "/AlterEgoImages/Ryan_AlterEgo.jpeg",
    imageThumbnailfilename: "/AlterEgoImages/Ryan_AlterEgo.jpeg",
    voteCount: 0
  },
  {
    HID: "3",
    name: "Will",
    email: "",
    prompt: "Alter Ego",
    imagefilename: "/AlterEgoImages/Will_AlterEgo.jpeg",
    imageThumbnailfilename: "/AlterEgoImages/Will_AlterEgo.jpeg",
    voteCount: 0
  },
  {
    HID: "4",
    name: "Ankit",
    email: "",
    prompt: "Alter Ego",
    imagefilename: "/AlterEgoImages/Ankit_AlterEgo.jpeg",
    imageThumbnailfilename: "/AlterEgoImages/Ankit_AlterEgo.jpeg",
    voteCount: 0
  },
  {
    HID: "5",
    name: "Ryan",
    email: "",
    prompt: "Alter Ego",
    imagefilename: "/AlterEgoImages/Ryan_AlterEgo.jpeg",
    imageThumbnailfilename: "/AlterEgoImages/Ryan_AlterEgo.jpeg",
    voteCount: 0
  },
  {
    HID: "6",
    name: "Will",
    email: "",
    prompt: "Alter Ego",
    imagefilename: "/AlterEgoImages/Will_AlterEgo.jpeg",
    imageThumbnailfilename: "/AlterEgoImages/Will_AlterEgo.jpeg",
    voteCount: 0
  },
  {
    HID: "7",
    name: "Ryan",
    email: "",
    prompt: "Alter Ego",
    imagefilename: "/AlterEgoImages/Ryan_AlterEgo.jpeg",
    imageThumbnailfilename: "/AlterEgoImages/Ryan_AlterEgo.jpeg",
    voteCount: 0
  },
  {
    HID: "8",
    name: "Will",
    email: "",
    prompt: "Alter Ego",
    imagefilename: "/AlterEgoImages/Will_AlterEgo.jpeg",
    imageThumbnailfilename: "/AlterEgoImages/Will_AlterEgo.jpeg",
    voteCount: 0
  }
];