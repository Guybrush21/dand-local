import Generator from './generator'
import Character from '../model/character'
import ClassGenerator from './classGenerator'
import RaceGenerator from './raceGenerator'
import SexGenerator from './sexGenerator'
import FemaleNameGenerator from './femaleNameGenerator'
import MaleNameGenerator from './maleNameGenerator'
import LastnameGenerator from './lastnameGenerator'

export default class CharacterGenerator extends Generator {
    constructor() {
        super()
        this.classGenrator = new ClassGenerator()
        this.raceGenerator = new RaceGenerator()
        this.lastnameGenerator = new LastnameGenerator()
        this.sexGenerator = new SexGenerator()
        this.maleGenerator = new MaleNameGenerator()
        this.femaleGenerator = new FemaleNameGenerator()
    }

    next() {
        let character = new Character()
        character.class = this.classGenrator.next()
        character.race = this.raceGenerator.next()
        
        character.sex = this.sexGenerator.next()
        character.name = this.maleGenerator.next()
        if(!character.sex === "Male")
            character.name = this.femaleGenerator.next()

        character.name = [character.name, this.lastnameGenerator.next()].join(' ') 

        return character
    }

}