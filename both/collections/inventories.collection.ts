import { MongoObservable } from 'meteor-rxjs';

import { Inventory } from '../models/inventory.model';

export const Inventories = new MongoObservable.Collection<Inventory>('inventories');
