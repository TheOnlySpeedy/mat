import { Hero } from '../../../both/models/hero.model';
import { Blueprint } from '../../../both/models/blueprint.model';
import { Item } from '../../../both/models/item.model';
import { Resource } from '../../../both/models/resource.model';
import { HeroSkills } from '../../../both/models/heroskills.model';

const I_LONGSWORD: Item = {
  _id: "i111",
  name: "Longsword",
  cat: "mainhand",
  level: 1,
  timeToCraft: 120000,
  children: null
};

const I_BROADSWORD: Item = {
  _id: "i112",
  name: "Broadsword",
  cat: "mainhand",
  level: 1,
  timeToCraft: 120000,
  children: null
};

const I_DOUBLEHANDEDSWORD: Item = {
  _id: "i113",
  name: "double handed Sword",
  cat: "bothhands",
  level: 1,
  timeToCraft: 120000,
  children: null
};

const I_SWORD: Item = {
  _id: "i11",
  name: "Sword",
  cat: "mainhand",
  level: 1,
  timeToCraft: 120000,
  children: {
    3: I_LONGSWORD,
    6: I_BROADSWORD,
    9: I_DOUBLEHANDEDSWORD
  }
};

const I_DAGGER: Item = {
  _id: "i12",
  name: "Dagger",
  cat: "offhand",
  level: 1,
  timeToCraft: 120000,
  children: null
};

const I_KNIFE: Item = {
  _id: "i1",
  name: "Knife",
  cat: "mainhand",
  level: 1,
  timeToCraft: 60000,
  children: {
    5: I_SWORD,
    10: I_DAGGER
  }
};

const SKILLS: HeroSkills = {
  _id: "",
  uid: "",
  hid: "",
  learned: {
    'i1': 1
  }
};

export const INITBLUEPRINT: Blueprint = {
  hid: "",
  items: [
    I_KNIFE
  ]
};

export const INITHEROES: Hero[] = [
  { _id: "", uid: "", name: "Aaron",   work: { desc: "", startedAt: null, finishedAt: null, countdown: null } },
  { _id: "", uid: "", name: "Ben",     work: { desc: "", startedAt: null, finishedAt: null, countdown: null } },
  { _id: "", uid: "", name: "Gertrud", work: { desc: "", startedAt: null, finishedAt: null, countdown: null } }
];

export const INITRESOURCES: Resource[] = [
  { name: "Wood", amount: 20 },
  { name: "Iron", amount: 10 }
];
