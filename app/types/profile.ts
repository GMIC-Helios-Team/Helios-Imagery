
export interface Person { 
  name: string;
  position: string;
  bio: string;
  image: string;
}

export interface Profile {
  id: number;
  display: string;
  front: Person;
  back: Person;
}