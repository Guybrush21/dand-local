import Generator from './generator';
import { v4 as uuidv4 } from 'uuid';
import { ITEM_TYPE } from '../common/constant';
import Item from '../model/item.model';

export default class CharacterGenerator extends Generator {
  constructor() {
    const items = [
      "Benevolent Titan's War-axe of Ice Circles",
      "Crazed Kraken's Machine",
      "Deathly Hearers' Cudgel",
      "Deathly Spectre's Crossbow of Negate Entanglement",
      "Dire Angel's Scimtar of the Ancestral Spell of Conjuration",
      "Divine Seekers' Chain Mail",
      "Ghosts' War-axe",
      "Glorious Dwarves' Shield",
      "Gods' Shuriken",
      "Haunt's Boots",
      "Innocent Berserkers' Tiara",
      "Intelligent Sinner's Potion of the Working of Defile Tomes",
      "Lordly Triton's Spear of the Dragons",
      "Minor Wyrms' Pipes of Dust Touch",
      "Mystical Seeker's Awl-pike",
      'Nomads Blowgun',
      "Sly Keepers' Harpoon",
      "Titan's Dart of the Holy Incatation of Call Annihilator",
      "Triton's Anklet of the Saint's Hex of Mana",
      "War-axe of the Evokers' Glamour of Anger",
      "Wonderful Feline's Salve",
      'Amulet of Platinum',
      'Anklet of Earth Walls',
      'Atal of the Lady',
      'Automaton of the Goblin',
      'Axe of Aquatic Charisma Gushes',
      'Banded Mail of Goblin Slaying',
      'Banded Mail of Negate Revealing',
      'Bastard Sword of the Barbarian',
      'Bow of Absorbs Possession',
      'Buckler of the Fish',
      'Bullet of Deflect Voidness',
      'Cutlass of Deflect Ease',
      'Dwarven Adamantine Spear',
      'Dwarven Automaton',
      'Dwarven Shuriken',
      'Elemental Pants',
      'Elven Glowing Banded Mail',
      'Glaive of the Bears',
      'Harp of Flesh Circle',
      'Moccasins of the Ghostly Glamour of Control Mud',
      'Plate Mail of Lava Nets',
      'Portable Medication of Slime Clouds',
      'Rapier of Villainous Benevolence Zone',
      'Red War-axe of the Fortuitous Calling of Kill Queen',
      'Sacred Meteoric Two-handed Sword',
      'Saintly Vest of the Calling of Revealing Absorbtion',
      'Scintillating Chain Mail of Divine Dwarves',
      'Shield of Sound Deflection',
      'Shield of the Incatation of Alter Hiding',
      'Spectral Awl-pike of Call Cleric',
      'Spectral Purple Cube',
      'Spiritual Elixir of Great Sound Barriers',
      'Splendid Prismatic Torc of Deadly Silver',
      'Ultimate Harpoon of Slime Barriers',
      'Unholy Immovable Hammer of Flesh Webs',
      'Villainous Fiery Cudgel of the Sigil of Sludge Deflection',
      'Vorpal Pipes of the Witchery of Absorbs Perfection',
      'White Breast Plate',
      'Accursed Trident',
    ];
    super(items);
  }

  next() {
    let item: Item = {
      _id: uuidv4(),
      isFavorite: false,
      type: ITEM_TYPE,
      name: super.next(),
      description: '',
    };

    return item;
  }
}
