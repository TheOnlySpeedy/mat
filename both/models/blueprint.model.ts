import { Item } from './item.model';

export interface Blueprint {
  hid: string;
  items: Item[];
}
