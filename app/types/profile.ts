
export interface Person { 
  name: string;
  bio: string;
  image: string;
}

export interface Profile {
  id: number;
  display: string;
  team: string;
  position: string;
  front: Person;
  back: Person;
}