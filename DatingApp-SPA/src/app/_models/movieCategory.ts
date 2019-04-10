import { Movie } from './movie';

export interface MovieCategory {
  id: number;
  title: string;
  description: string;
  movies?: Movie[];
}
