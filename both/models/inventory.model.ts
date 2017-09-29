import { Resource } from './resource.model';
import { Item } from './item.model';

export interface Inventory {
  uid: string;
  stock: Resource[];
  items: Item[];
}
