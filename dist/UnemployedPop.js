export class UnemployedPop {
    get pop() {
        return UnemployedPop._pop;
    }
    static changeNumOfUnemployed(value) {
        this._unemployedPop += value;
    }
}
UnemployedPop._unemployedPop = 0;
