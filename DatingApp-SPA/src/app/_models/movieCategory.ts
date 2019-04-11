import { Movie } from './movie';

export interface MovieCategory {
  description: string;
  id: number;
  title: string;
  url: string;
  movies?: Movie[];
}
