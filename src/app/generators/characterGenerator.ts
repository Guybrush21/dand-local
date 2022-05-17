import Generator from './generator';
import ClassGenerator from './classGenerator';
import RaceGenerator from './raceGenerator';
import SexGenerator from './sexGenerator';
import FemaleNameGenerator from './femaleNameGenerator';
import MaleNameGenerator from './maleNameGenerator';
import LastnameGenerator from './lastnameGenerator';
import Character from '../model/character.model';

const CHARACTER_TYPE = 'character';

export default class CharacterGenerator extends Generator {
    classGenrator: ClassGenerator;
    raceGenerator: RaceGenerator;
    lastnameGenerator: LastnameGenerator;
    sexGenerator: SexGenerator;
    maleGenerator: MaleNameGenerator;
    femaleGenerator: FemaleNameGenerator;
    constructor() {
        super([]);
        this.classGenrator = new ClassGenerator();
        this.raceGenerator = new RaceGenerator();
        this.lastnameGenerator = new LastnameGenerator();
        this.sexGenerator = new SexGenerator();
        this.maleGenerator = new MaleNameGenerator();
        this.femaleGenerator = new FemaleNameGenerator();
    }

    next() {
        let character: Character = {
            class: this.classGenrator.next(),
            race: this.raceGenerator.next(),
            sex: this.sexGenerator.next(),
            name: this.maleGenerator.next(),
            isFavorite: false,
            type: CHARACTER_TYPE,
        };

        //fix name according to sex
        if (character.sex !== 'male') {
            character.name = this.femaleGenerator.next();
        }
        character.name = [character.name, this.lastnameGenerator.next()].join(
            ' '
        );

        return character;
    }
}
