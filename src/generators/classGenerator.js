import Generator from './generator'

export default class ClassGenerator extends Generator{

    constructor(){
        let races = [ "Barbarian",
        "Bard",
        "Cleric",
        "Druid",
        "Fighter",
        "Monk",
        "Paladin",
        "Ranger",
        "Rogue",
        "Sorcerer",
        "Warlock",
        "Wizard"]
        super(races)
    }

}