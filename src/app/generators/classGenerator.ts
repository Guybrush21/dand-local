import Generator from './generator';

export default class ClassGenerator extends Generator {
  constructor() {
    const classes = [
      'Barbarian',
      'Bard',
      'Cleric',
      'Druid',
      'Fighter',
      'Monk',
      'Paladin',
      'Ranger',
      'Rogue',
      'Sorcerer',
      'Warlock',
      'Wizard',
    ];
    super(classes);
  }
}
