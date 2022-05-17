import Generator from './generator';

export default class RaceGenerator extends Generator {
    constructor() {
        const races = [
            'Elf',
            'Human',
            'Dwarf',
            'Gnome',
            'Halfling',
            'Orc',
            'Bloodelf',
            'Dragonborn',
            'Tiefling',
            'Halforc',
        ];
        super(races);
    }
}
