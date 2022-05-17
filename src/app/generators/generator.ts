export default class Generator {
    values: string[];
    constructor(values: string[]) {
        this.values = values;
    }
    getRandom() {
        const min = 0;
        const max = Math.floor(this.values.length - 1);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    next(): any {
        return this.values[this.getRandom()];
    }
}
