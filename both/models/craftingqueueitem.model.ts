import { Item } from './item.model';

export interface CraftingQueueItem {
  _id: string;
  hid: string;
  uid: string;
  item: Item;
  timeOfCompletion: number;
}
