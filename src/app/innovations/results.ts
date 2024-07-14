export class Results<T> {
  data: T[] = [];
  next?: string;
  previous?: string;
  total?: number;
}
