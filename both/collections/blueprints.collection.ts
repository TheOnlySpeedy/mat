import { MongoObservable } from 'meteor-rxjs';

import { Blueprint } from '../models/blueprint.model';

export const Blueprints = new MongoObservable.Collection<Blueprint>('blueprints');
