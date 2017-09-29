import { Meteor } from 'meteor/meteor';

import { createAdmin } from './imports/fixtures/admin';

import './imports/publications/heroes';
import './imports/publications/inventories';
import './imports/publications/blueprints';

import './imports/fixtures/methods';

Meteor.startup(() => {
  let adminId = createAdmin();
});
