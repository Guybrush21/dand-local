export default class Generator{

    constructor(values){
        this.values = values
    }

    getRandom() {
        let min = 0;
        let max = Math.floor(this.values.length-1);
        return Math.floor(Math.random() * (max - min + 1)) + min; 
      }

    next(){        
        return this.values[this.getRandom()]
    }
}