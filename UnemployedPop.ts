import { Pop } from "./Pop";

export class UnemployedPop{
    private static _unemployedPop:number=0;
    private static _pop:Pop;
    get pop():Pop{
        return UnemployedPop._pop;
    }
    public static changeNumOfUnemployed(value:number){
        this._unemployedPop+=value;
    }
}