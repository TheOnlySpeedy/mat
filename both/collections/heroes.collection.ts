import { MongoObservable } from 'meteor-rxjs';

import { Hero } from '../models/hero.model';

export const Heroes = new MongoObservable.Collection<Hero>('heroes');
