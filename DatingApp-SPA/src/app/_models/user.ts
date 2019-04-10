import { Photo } from './photo';
import { MovieCategory } from './movieCategory';
import { Movie } from './movie';

export interface User {
   id: number;
   username: string;
   knownAs: string;
   age: number;
   gender: string;
   created: Date;
   lastActie: Date;
   photoUrl: string;
   city: string;
   country: string;
   interest?: string;
   introduction?: string;
   lookingFor?: string;
   photos?: Photo[];
   movieCategories?: MovieCategory[];
}
