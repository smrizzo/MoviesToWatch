import { Movie } from './movie';
import { Photo } from './photo';

export interface MovieCategory {
  description: string;
  id: number;
  title: string;
  url: string;
  movies?: Movie[];
  photos?: Photo[];
}
