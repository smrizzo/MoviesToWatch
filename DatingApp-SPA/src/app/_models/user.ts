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
   lastActive: Date;
   city: string;
   country: string;
   movieCategories?: MovieCategory[];
}
