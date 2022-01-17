import {Market} from "./Market";
import neededResource from "./NeededResource";
import { Pop } from "./Pop";
import { PopManager } from "./PopManager";
import Resource from "./Resource";

class Factory{
    private _name:string;
    private _producedResource:Resource;
    private _producedQuantity:number;
    private _neededResources:Map<string, number>= new Map<string,number>();
    private _currentWorkers:number;
    private _capacity:number;
    private _popType:Pop;
    private _profit:number;
    private _money:number;
    private _balance:number;

    constructor(name:string,initialWorkers:number, capacity:number, initialMoney:number, produce:Resource){
        this._name=name
        this._capacity=capacity;
        this._currentWorkers=initialWorkers;
        this._popType=new Pop();        
        this._money=initialMoney;
        this._profit=0;
        this._balance=0;
        this._producedResource=produce;
        this.updateNeededResources();
    }
    get currentWorkers():number{
        return this.currentWorkers;
    }
    set currentWorkers(value:number){
        this._currentWorkers=value;
    }
    private updateNeededResources(){
        if(this._producedResource.independent==true){
            this._neededResources=null;
        }else{
            this._producedResource.neededResources.forEach((resource:neededResource) => {
                this._neededResources.set(resource.resource.name, resource.ratio*this._currentWorkers* this._popType.productivity);
            });
        }
    }

    public work(){
        let oldMoney=this._money;
        let moneyGained = this.makeAndSellProducts();
        this._balance=this._money+moneyGained - oldMoney;        
        this.recalculatePrices();
        this.payTaxes();
        PopManager.paySalaries(this._balance/2, this._popType, this._currentWorkers, this);
        this._money += this._balance/2;
        this._balance=0;

    }

    private payTaxes(){
        if(this._balance>0){
            let tax= this._balance/10;
            this._balance = this._balance - tax;
            Government.money+=tax;
        }
    }
    private recalculatePrices(){
        if(this._balance<=0){
            Market.increasePrice(this._producedResource.name);
        }
    }
    private makeAndSellProducts():number{
        //update resource needs based on productivity
        this.updateNeededResources();
        //buy resources needed for production of goods
        this._money = Market.buyResources(this._neededResources,this._money);
        let producedQuantity = this._currentWorkers* this._popType.productivity;
        return Market.sellResources(this._producedResource.name, producedQuantity); 
    }



}