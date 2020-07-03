import Generator from './generator'

export default class RaceGenerator extends Generator{

    constructor(){
        let races = ["Elf","Human","Dwarf","Gnome","Halfling","Orc","Bloodelf","Dragonborn","Tiefling","Halforc"]
        super(races)
    }

}