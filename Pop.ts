export class Pop{
    private _happiness:number=80;
    private _productivity:number=1;
    private _money:number;
    private _chanceToLeaveWork:number;

    get money():number{
        return this._money;
    }
    set money(value:number){
        this._money=value;
    }
    get happiness():number{
        return this.happiness;
    }
    get chanceToLeaveWork():number{
        return this._chanceToLeaveWork;
    }
    set chanceToLeaveWork(value:number){
        this._chanceToLeaveWork=value;
    }

    set productivity(value:number){
        this._productivity=value;
    }
    
    constructor(){

    }
    public recieveSalary(value:number){
        this._money+=value;
    }
    public modifyHappiness(value:number){
        this._happiness+=value;
    }

    
}