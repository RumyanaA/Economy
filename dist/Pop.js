export class Pop {
    constructor() {
        this._happiness = 80;
        this._productivity = 1;
    }
    get money() {
        return this._money;
    }
    set money(value) {
        this._money = value;
    }
    get happiness() {
        return this.happiness;
    }
    get chanceToLeaveWork() {
        return this._chanceToLeaveWork;
    }
    set chanceToLeaveWork(value) {
        this._chanceToLeaveWork = value;
    }
    set productivity(value) {
        this._productivity = value;
    }
    recieveSalary(value) {
        this._money += value;
    }
    modifyHappiness(value) {
        this._happiness += value;
    }
}
